-- Enums
create type pricing_type_enum as ENUM(
  'free',
  'open_source',
  'freemium',
  'paid',
  'enterprise'
);

create type pricing_interval_enum as ENUM('monthly', 'yearly', 'one_time');

create type tool_status_enum as ENUM('pending', 'approved', 'rejected', 'archived');

create type analytics_event_type_enum as ENUM('view', 'click', 'favorite', 'review');

-- Categories (hierarchical). Use tool_categories for primary/secondary assignment
create table categories (
  id UUID primary key default gen_random_uuid (),
  name VARCHAR(100) not null,
  parent_id UUID references categories (id) on delete set null,
  sort_order INTEGER default 0,
  usage_count INTEGER default 0,
  created_at TIMESTAMPTZ default NOW(),
  updated_at TIMESTAMPTZ default NOW()
);

-- Tags (flexible labeling)
create table tags (
  id UUID primary key default gen_random_uuid (),
  name VARCHAR(50) not null unique,
  usage_count INTEGER default 0,
  created_at TIMESTAMPTZ default NOW()
);

-- Core tools entity
create table tools (
  id UUID primary key default gen_random_uuid (),
  slug VARCHAR(150) unique not null,
  name VARCHAR(200) not null,
  tagline TEXT,
  short_description TEXT,
  description TEXT,
  website_url TEXT not null,
  logo_url TEXT,
  primary_screenshot_url TEXT,
  screenshot_urls TEXT, -- gallery
  -- Pricing & business
  pricing_type pricing_type_enum not null,
  starting_price NUMERIC(10, 2), -- nullable (e.g., free/custom)
  has_api BOOLEAN default false,
  api_doc_url TEXT,
  affiliate_url TEXT,
  -- Social & stats
  rating NUMERIC(3, 2) default 0,
  review_count INTEGER default 0,
  total_users INTEGER default 0,
  github_stars INTEGER,


  -- SEO & metadata
  meta_title VARCHAR(60),
  meta_description VARCHAR(160),
  -- Moderation & curation
  status tool_status_enum default 'pending',
  is_featured BOOLEAN default false,
  is_trending BOOLEAN default false,
  submitted_at TIMESTAMPTZ default NOW(),
  approved_at TIMESTAMPTZ,
  -- Engagement counters (denormalized for speed)
  view_count INTEGER default 0,
  click_count INTEGER default 0,
  favorite_count INTEGER default 0,
  created_at TIMESTAMPTZ default NOW(),
  updated_at TIMESTAMPTZ default NOW(),
  last_updated TIMESTAMPTZ default NOW()
);

-- Tool ↔ Category assignment (supports primary + multiple subcategories)
create table tool_categories (
  tool_id UUID references tools (id) on delete CASCADE,
  category_id UUID references categories (id) on delete CASCADE,
  is_primary BOOLEAN default false,
  sort_order INTEGER default 0,
  primary key (tool_id, category_id)
);

-- Tool ↔ Tag assignment
create table tool_tags (
  tool_id UUID references tools (id) on delete CASCADE,
  tag_id UUID references tags (id) on delete CASCADE,
  primary key (tool_id, tag_id)
);

-- Features; also used for "key benefits" on detail pages
create table features (
  id UUID primary key default gen_random_uuid (),
  tool_id UUID references tools (id) on delete CASCADE,
  title VARCHAR(200) not null,
  description TEXT,
  sort_order INTEGER default 0
);

-- Pricing tiers for details
create table pricing_tiers (
  id UUID primary key default gen_random_uuid (),
  tool_id UUID references tools (id) on delete CASCADE,
  name VARCHAR(100) not null,
  price NUMERIC(10, 2), -- NULL when custom
  is_custom_price BOOLEAN default false,
  interval pricing_interval_enum,
  features JSONB, -- list of included features
  limits JSONB, -- arbitrary limits { apiCalls, users, storage }
  highlighted BOOLEAN default false,
  sort_order INTEGER default 0
);

-- AI models used/offered by the tool
create table ai_models (
  id UUID primary key default gen_random_uuid (),
  tool_id UUID references tools (id) on delete CASCADE,
  name VARCHAR(120) not null,
  version VARCHAR(60),
  provider VARCHAR(120),
  sort_order INTEGER default 0
);

-- Alternatives (self-referencing many-to-many)
create table tool_alternatives (
  tool_id UUID references tools (id) on delete CASCADE,
  alternative_tool_id UUID references tools (id) on delete CASCADE,
  primary key (tool_id, alternative_tool_id),
  constraint chk_tool_alternative_not_self check (tool_id <> alternative_tool_id)
);

-- User favorites (bookmarks)
create table user_favorites (
  user_id UUID references auth.users (id) on delete CASCADE,
  tool_id UUID references tools (id) on delete CASCADE,
  created_at TIMESTAMPTZ default NOW(),
  primary key (user_id, tool_id)
);

-- Analytics events (raw)
create table analytics_events (
  id UUID primary key default gen_random_uuid (),
  tool_id UUID references tools (id) on delete CASCADE,
  event_type analytics_event_type_enum not null,
  user_id UUID references auth.users (id) on delete set null,
  session_id VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ default NOW()
);

-- Daily rollups (fast trending queries)
create table tool_analytics_daily (
  tool_id UUID references tools (id) on delete CASCADE,
  date DATE not null,
  views INTEGER default 0,
  clicks INTEGER default 0,
  favorites_added INTEGER default 0,
  reviews_added INTEGER default 0,
  primary key (tool_id, date)
);

-- Sponsors and sponsorships
create table sponsors (
  id UUID primary key default gen_random_uuid (),
  name VARCHAR(150) not null,
  website_url TEXT,
  logo_url TEXT,
  contact_email VARCHAR(200),
  created_at TIMESTAMPTZ default NOW()
);

create table sponsorships (
  id UUID primary key default gen_random_uuid (),
  sponsor_id UUID references sponsors (id) on delete CASCADE,
  -- Target can be a tool, a category, or left NULL for global placements
  tool_id UUID references tools (id) on delete CASCADE,
  category_id UUID references categories (id) on delete CASCADE,
  placement VARCHAR(50) default 'banner', -- e.g., banner, sidebar, inline
  start_date DATE not null,
  end_date DATE not null,
  cta_url TEXT,
  banner_image_url TEXT,
  price NUMERIC(12, 2),
  note TEXT,
  created_at TIMESTAMPTZ default NOW(),
  constraint sponsorship_time_valid check (end_date >= start_date)
);

-- Helpful sponsorship indexes
create index idx_sponsorships_tool on sponsorships (tool_id);

create index idx_sponsorships_category on sponsorships (category_id);

create index idx_sponsorships_date on sponsorships (start_date, end_date);

-- Helpful indexes
create index idx_tools_status_featured on tools (status, is_featured)
where
  status = 'approved';

create index idx_tools_trending on tools (is_trending)
where
  status = 'approved'
  and is_trending = true;

create index idx_tools_created_desc on tools (created_at desc)
where
  status = 'approved';

create index idx_tools_rating on tools (rating desc, review_count desc)
where
  status = 'approved';

create index idx_tools_counters on tools (view_count desc, click_count desc)
where
  status = 'approved';

create index idx_tool_categories_primary on tool_categories (tool_id)
where
  is_primary = true;

create index idx_tool_tags_tool on tool_tags (tool_id);

create index idx_tool_tags_tag on tool_tags (tag_id);

create index idx_analytics_created on analytics_events (created_at);

create index idx_analytics_tool_event on analytics_events (tool_id, event_type, created_at);

-- Full-text search index
create index idx_tools_fts on tools using GIN (
  to_tsvector(
    'english',
    coalesce(name, '') || ' ' || coalesce(tagline, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(description, '')
  )
);


-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);
CREATE POLICY "Public tags read" ON tags FOR SELECT USING (true);
CREATE POLICY "Public tools read" ON tools FOR SELECT USING (true);
CREATE POLICY "Public tool_categories read" ON tool_categories FOR SELECT USING (true);
CREATE POLICY "Public tool_tags read" ON tool_tags FOR SELECT USING (true);
CREATE POLICY "Public features read" ON features FOR SELECT USING (true);
CREATE POLICY "Public pricing_tiers read" ON pricing_tiers FOR SELECT USING (true);
CREATE POLICY "Public ai_models read" ON ai_models FOR SELECT USING (true);
CREATE POLICY "Public tool_alternatives read" ON tool_alternatives FOR SELECT USING (true);
CREATE POLICY "Public sponsors read" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Public sponsorships read" ON sponsorships FOR SELECT USING (true);
CREATE POLICY "Public tool_analytics_daily read" ON tool_analytics_daily FOR SELECT USING (true);

-- Restrict all writes by default
CREATE POLICY "Restrict categories writes" ON categories FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict tags writes" ON tags FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict tools writes" ON tools FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict tool_categories writes" ON tool_categories FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict tool_tags writes" ON tool_tags FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict features writes" ON features FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict pricing_tiers writes" ON pricing_tiers FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict ai_models writes" ON ai_models FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict tool_alternatives writes" ON tool_alternatives FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict sponsors writes" ON sponsors FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict sponsorships writes" ON sponsorships FOR ALL TO authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Restrict tool_analytics_daily writes" ON tool_analytics_daily FOR ALL TO authenticated USING (false) WITH CHECK (false);

-- Special policies for user_favorites
CREATE POLICY "User favorites read access" ON user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User favorites insert access" ON user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User favorites delete access" ON user_favorites FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Restrict user_favorites updates" ON user_favorites FOR UPDATE USING (false) WITH CHECK (false);

-- Special policies for analytics_events
CREATE POLICY "Public analytics insert" ON analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Restrict analytics read" ON analytics_events FOR SELECT USING (false);
CREATE POLICY "Restrict analytics updates" ON analytics_events FOR UPDATE USING (false) WITH CHECK (false);
CREATE POLICY "Restrict analytics deletes" ON analytics_events FOR DELETE USING (false);



