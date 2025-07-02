// https://www.digikey.ca/en/resources/conversion-calculators/conversion-calculator-resistor-color-code
/*export enum Colours {
   Black = '#000',
   Brown = '#512627',
   Red = '#FF2100',
   Orange = '#D87347',
   Yellow = '#E6C951',
   Green = '#528F65',
   Blue = '#0F5190',
   Violet = '#6967CE',
   Grey = '#7D7D7D',
   White = '#FFF',

   Gold = '#C08327',
   Silver = '#BFBEBF'
}*/

// https://people.duke.edu/~ng46/topics/color-code.htm
/*export enum Colours {
   Black = '#000',
   Brown = '#996633',
   Red = '#FF0000',
   Orange = '#FF9900',
   Yellow = '#FFFF00',
   Green = '#00FF00',
   Blue = '#0000FF',
   Violet = '#FF00FF',
   Grey = '#CCCCCC',
   White = '#FFFFFF',

   Gold = '#C08327',
   Silver = '#BFBEBF'
}*/

export interface Colour {
   name: string,
   bgColour: string,
   fgColour: string
}

const Black: Colour = {
   name: 'Black',
   bgColour: '#000',
   fgColour: 'white'
}

const Brown: Colour = {
   name: 'Brown',
   bgColour: '#512627',
   fgColour: 'white'
}

const Red: Colour = {
   name: 'Red',
   bgColour: '#FF2100',
   fgColour: 'white'
}

const Orange: Colour = {
   name: 'Orange',
   bgColour: '#D87347',
   fgColour: 'white'
}

const Yellow: Colour = {
   name: 'Yellow',
   bgColour: '#E6C951',
   fgColour: 'black'
}

const Green: Colour = {
   name: 'Green',
   bgColour: '#528F65',
   fgColour: 'white'
}

const Blue: Colour = {
   name: 'Blue',
   bgColour: '#0F5190',
   fgColour: 'white'
}

const Violet: Colour = {
   name: 'Violet',
   bgColour: '#6967CE',
   fgColour: 'white'
}

const Grey: Colour = {
   name: 'Grey',
   bgColour: '#7D7D7D',
   fgColour: 'white'
}

const White: Colour = {
   name: 'White',
   bgColour: '#FFF',
   fgColour: 'black'
}

const Gold: Colour = {
   name: 'Gold',
   bgColour: '#C08327',
   fgColour: 'white'
}

const Silver: Colour = {
   name: 'Silver',
   bgColour: '#BFBEBF',
   fgColour: 'white'
}

export function getColourValue(name: string|null, values: ColourValue[]) {
   if (name) {
      name = name.toLowerCase();
      for (const c of values) {
         if (c.colour.name.toLowerCase() == name) {
            return c;
         }
      }
   }
}

export interface ColourValue {
   colour: Colour,
   value: number
}

export const valueColours: ColourValue[] = [
   { colour: Black, value: 0 },
   { colour: Brown, value: 1 },
   { colour: Red, value: 2 },
   { colour: Orange, value: 3 },
   { colour: Yellow, value: 4 },
   { colour: Green, value: 5 },
   { colour: Blue, value: 6 },
   { colour: Violet, value: 7 },
   { colour: Grey, value: 8 },
   { colour: White, value: 9 }
];

export const multiplierColours: ColourValue[] = [
   { colour: Black, value: 1 },
   { colour: Brown, value: 10 },
   { colour: Red, value: 100 },
   { colour: Orange, value: 1000 },
   { colour: Yellow, value: 10000 },
   { colour: Green, value: 100000 },
   { colour: Blue, value: 1000000 },
   { colour: Violet, value: 10000000 },
   { colour: Grey, value: 100000000 },
   { colour: White, value: 1000000000 },
   { colour: Gold, value: 0.1 },
   { colour: Silver, value: 0.01 }
];

export const toleranceColours: ColourValue[] = [
   { colour: Brown, value: 1 },
   { colour: Red, value: 2 },
   { colour: Green, value: 0.5 },
   { colour: Blue, value: 0.25 },
   { colour: Violet, value: 0.1 },
   { colour: Grey, value: 0.05 },
   { colour: Gold, value: 5 },
   { colour: Silver, value: 10 }
];
