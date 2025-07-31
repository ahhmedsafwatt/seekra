import { SiBuymeacoffee } from 'react-icons/si'
import { Button } from '../ui/button'
import { SearchIcon } from '../icons'
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import Link from 'next/link'

export const ActionButtons = () => (
  <div className="z-50 flex items-center gap-1">
    <SearchIcon
      fill="currentColor"
      className="text-muted-foreground hover:bg-accent hover:text-secondary box-content size-5 cursor-pointer rounded-sm p-1.5 transition-colors duration-200"
    />

    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="https://www.buymeacoffee.com/ahmedsafwat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiBuymeacoffee
            size={18}
            className="text-muted-foreground hover:bg-accent hover:text-secondary box-content cursor-pointer rounded-sm p-1.5 transition-colors duration-200"
          />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>buy me a coffee</p>
      </TooltipContent>
    </Tooltip>
    <Button
      asChild
      size="sm"
      className="ml-1 rounded-sm duration-200 ease-out hover:scale-95"
    >
      <a href="/submit">Submit</a>
    </Button>
  </div>
)
