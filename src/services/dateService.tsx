export const displayDate = (date: string): string => {
    const currentYear = new Date().getFullYear().toString();

    if (date.split('.')[date.split('.').length - 1] === currentYear) {
      return date.split('.').slice(0, -1).join('.') + '.';
    } else {
      return date;
    }
  };