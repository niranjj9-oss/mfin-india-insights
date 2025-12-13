import { useState } from 'react';
import { Search, X, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { mockFunds, MutualFund, fundCategories } from '@/data/mockFunds';

interface FundSelectorProps {
  selectedFunds: MutualFund[];
  onSelect: (fund: MutualFund) => void;
  onRemove: (fundId: string) => void;
  maxFunds?: number;
}

export function FundSelector({
  selectedFunds,
  onSelect,
  onRemove,
  maxFunds = 3,
}: FundSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  const availableFunds = mockFunds.filter(
    (fund) =>
      !selectedFunds.find((sf) => sf.id === fund.id) &&
      (categoryFilter === 'All Categories' || fund.category === categoryFilter) &&
      (fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.amc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectFund = (fund: MutualFund) => {
    if (selectedFunds.length < maxFunds) {
      onSelect(fund);
      setOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Funds */}
      <div className="flex flex-wrap gap-2">
        {selectedFunds.map((fund) => (
          <Badge
            key={fund.id}
            variant="secondary"
            className="py-2 px-3 text-sm bg-primary/10 border-primary/20 flex items-center gap-2"
          >
            <span className="max-w-[200px] truncate">{fund.shortName}</span>
            <button
              onClick={() => onRemove(fund.id)}
              className="hover:bg-primary/20 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {selectedFunds.length < maxFunds && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-dashed border-2 gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Fund ({selectedFunds.length}/{maxFunds})
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 bg-background border-border shadow-xl z-50" align="start">
              <Command className="bg-transparent">
                <div className="p-2 border-b border-border">
                  <CommandInput
                    placeholder="Search funds by name, AMC..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="h-9"
                  />
                </div>

                {/* Category Filter */}
                <div className="p-2 border-b border-border flex gap-1 flex-wrap">
                  {fundCategories.slice(0, 5).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        categoryFilter === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80 text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <CommandList className="max-h-[300px]">
                  <CommandEmpty>No funds found.</CommandEmpty>
                  <CommandGroup>
                    {availableFunds.map((fund) => (
                      <CommandItem
                        key={fund.id}
                        value={fund.name}
                        onSelect={() => handleSelectFund(fund)}
                        className="cursor-pointer py-3 px-3"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-sm">{fund.shortName}</span>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{fund.category}</span>
                            <span>•</span>
                            <span>{fund.amc}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs mt-1">
                            <span className="text-green-500">1Y: {fund.cagr1Y}%</span>
                            <span className="text-muted-foreground">ER: {fund.expenseRatio}%</span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {selectedFunds.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Select up to {maxFunds} mutual funds to compare side by side
        </p>
      )}
    </div>
  );
}
