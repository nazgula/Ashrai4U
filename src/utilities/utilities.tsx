export function formatNumber(input: string): string {
    if (input === '') {
      return input; // Return empty string as is
    }
  
    // Check if the input string consists of only digits
    if (/^\d+$/.test(input)) {
      // Use Intl.NumberFormat to format the number with commas
      const numberValue = Number(input);
      const formattedNumber = new Intl.NumberFormat().format(numberValue);
      return formattedNumber;
    } else {
      // Return the original string if it's not a valid number
      return input;
    }
  }

export function unformatNumber(input: string): string {
    // Remove commas from the input string
    
    const stringWithoutCommas = input.replace(/,/g, '');
  
    if (stringWithoutCommas === '') {
      return '0'; // Return '0' if the result is an empty string
    }
  
const parsedNumber = Number(stringWithoutCommas);
    // Check if the result is a valid number or NaN
    if (!isNaN(parsedNumber)) {
      return parsedNumber.toString(); // Return the number as a string
    } else {
      return '0'; // Return '0' if the result is NaN
    }
  }

  export function getQueryParamFromLocation(location: string, name: string): string | null {
    const urlParams = new URLSearchParams(location);
    return urlParams.get(name) as string | null;
}