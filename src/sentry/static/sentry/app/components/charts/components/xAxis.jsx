import moment from 'moment';

import theme from 'app/utils/theme';

export default function XAxis({isGroupedByDate, interval, ...props} = {}) {
  const axisLabelFormatter = value => {
    if (isGroupedByDate) {
      const format = interval === 'hour' ? 'LT' : 'MMM Do';
      return moment
        .utc(value)
        .local()
        .format(format);
    } else if (props.truncate && value.length > props.truncate) {
      return value.slice(0, props.truncate) + '…';
    } else {
      return undefined;
    }
  };

  return {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: theme.gray1,
        ...(props.axisLine || {}),
      },
    },
    axisTick: {
      lineStyle: {
        color: theme.gray1,
      },
      ...(props.axisTick || {}),
    },
    axisLabel: {
      margin: 12,
      formatter: axisLabelFormatter,
      ...(props.axisLabel || {}),
    },
    ...props,
  };
}
