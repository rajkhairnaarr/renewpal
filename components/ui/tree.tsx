"use client"

import * as React from "react"
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface TreeItem {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeItem[]
  isOpen?: boolean
  isSelected?: boolean
}

interface TreeProps {
  items: TreeItem[]
  onItemClick?: (item: TreeItem) => void
  onToggle?: (item: TreeItem) => void
  className?: string
}

const TreeItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeItem
    level?: number
    onItemClick?: (item: TreeItem) => void
    onToggle?: (item: TreeItem) => void
  }
>(({ item, level = 0, onItemClick, onToggle, className, ...props }, ref) => {
  const hasChildren = item.children && item.children.length > 0
  const isOpen = item.isOpen ?? false

  return (
    <div ref={ref} className={cn("", className)} {...props}>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          item.isSelected && "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
          "group"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onItemClick?.(item)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggle?.(item)
            }}
            className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
          >
            {isOpen ? (
              <ChevronDown className="h-3 w-3 text-gray-500" />
            ) : (
              <ChevronRight className="h-3 w-3 text-gray-500" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-4" />}
        
        <div className="flex items-center gap-2 flex-1">
          {item.icon || (
            hasChildren ? (
              isOpen ? (
                <FolderOpen className="h-4 w-4 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 text-gray-500" />
              )
            ) : (
              <File className="h-4 w-4 text-gray-400" />
            )
          )}
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      </div>
      
      {hasChildren && isOpen && (
        <div className="mt-1">
          {item.children?.map((child) => (
            <TreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
})
TreeItem.displayName = "TreeItem"

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ items, onItemClick, onToggle, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        {items.map((item) => (
          <TreeItem
            key={item.id}
            item={item}
            onItemClick={onItemClick}
            onToggle={onToggle}
          />
        ))}
      </div>
    )
  }
)
Tree.displayName = "Tree"

export { Tree, TreeItem }
export type { TreeItem as TreeItemType } 