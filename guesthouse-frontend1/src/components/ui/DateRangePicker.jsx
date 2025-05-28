import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePicker = ({ onChange, value, disabledDates = [] }) => {
  const [state, setState] = useState([
    {
      startDate: value?.start || new Date(),
      endDate: value?.end || new Date(),
      key: 'selection'
    }
  ]);

  const handleChange = (item) => {
    setState([item.selection]);
    onChange({
      start: item.selection.startDate,
      end: item.selection.endDate
    });
  };

  return (
    <div className="border rounded-lg p-2 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {state[0].startDate && format(state[0].startDate, 'MMM dd, yyyy')}
        </span>
        <span className="mx-2 text-gray-400">to</span>
        <span className="text-sm font-medium text-gray-700">
          {state[0].endDate && format(state[0].endDate, 'MMM dd, yyyy')}
        </span>
      </div>
      <DateRange
        editableDateInputs={true}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
        minDate={new Date()}
        disabledDates={disabledDates}
        rangeColors={['#3b82f6']}
      />
    </div>
  );
};

export default DateRangePicker;