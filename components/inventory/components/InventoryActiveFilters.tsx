import { ReactNode } from 'react';
import { NextRouter } from 'next/router';
import Button from '../../button/Button';
import { InventoryFilterData } from '../hooks/useInventory/types/useInventoryTypes';
import InventoryFilterSummary from './filter/InventoryFilterSummary';
import PlusIcon from '../../icons/PlusIcon';
import useFilterWizard from './filter/hooks/useFilterWizard';
import useInventory from '../hooks/useInventory/useInventory';
import InventoryFilterDropdown from './InventoryFilterDropdown';
import ClearFilterIcon from '../../icons/ClearFilterIcon';

type InventoryActiveFiltersProps = {
  hasFilters: boolean | undefined;
  displayedFilters: InventoryFilterData[] | undefined;
  isNotCustomView: boolean;
  deleteFilter: (idx: number) => void;
  router: NextRouter;
  children?: ReactNode;
};

function InventoryActiveFilters({
  hasFilters,
  displayedFilters,
  isNotCustomView,
  deleteFilter,
  router,
  children
}: InventoryActiveFiltersProps) {
  const { setSkippedSearch } = useInventory();
  const { toggle, isOpen } = useFilterWizard({ router, setSkippedSearch });

  return (
    <div className="my-5 flex items-center justify-between rounded-lg bg-white px-6 py-2">
      {!hasFilters ? (
        <>
          <div
            className="flex w-fit cursor-pointer items-center gap-1 rounded-md border-2 border-dashed border-black-200 border-opacity-60 px-3 py-1"
            onClick={toggle}
          >
            <PlusIcon width={16} height={16} />
            <span className="font-sans text-sm text-black-400">Filter</span>
          </div>
          {isOpen && (
            <InventoryFilterDropdown
              position={'top-10'}
              toggle={toggle}
              closeDropdownAfterAdd={true}
            />
          )}
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="h-full text-sm text-black-400">Filters</div>
          {displayedFilters &&
            displayedFilters.map((activeFilter, idx) => (
              <InventoryFilterSummary
                key={idx}
                id={idx}
                data={activeFilter}
                deleteFilter={isNotCustomView ? deleteFilter : undefined}
              />
            ))}

          {isNotCustomView && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="cursor-pointer" onClick={toggle}>
                  <PlusIcon width={16} height={16} />
                </div>
                {isOpen && (
                  <InventoryFilterDropdown
                    position={'top-10'}
                    toggle={toggle}
                    closeDropdownAfterAdd={false}
                  />
                )}
              </div>

              <div className="border-x-1 h-7 border"></div>
              <Button
                size="xxs"
                style="ghost"
                onClick={() => router.push(router.pathname)}
              >
                <ClearFilterIcon />
                Clear filters
              </Button>
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
}

export default InventoryActiveFilters;
