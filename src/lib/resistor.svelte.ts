import { getColourValue, multiplierColours, toleranceColours, valueColours, type ColourValue } from '.';

/*
- On page load, history state is empty
  - Read state from URL, and replace history state with URL content
- Listen to history pop state event, update state properties accordingly
- Push new state when any state property is changed
*/

export enum ResistorType {
   FourBand = 4,
   FiveBand = 5
}

function typeFromString(val: string | null) {
   if (val) {
      const ival = parseInt(val);
      switch (ival) {
         case ResistorType.FourBand: return ResistorType.FourBand;
         case ResistorType.FiveBand: return ResistorType.FiveBand;
      }
   }

   return ResistorType.FourBand;
}

type Band = string | null;
interface UrlState {
   type: ResistorType,
   bands: Band[]
}

function stateToUrl(state: UrlState): string {
   let params = [
      state.type.toString(),
      ...state.bands.map((b) => b ? b : '_')
   ];

   return `#${params.join('/')}`;
}

function stateFromUrl(): UrlState {
   let params: (string|null)[] = [];
   if (window.location.hash) {
      params = window.location.hash.slice(1) // strip leading '#'
         .split('/');
   }

   const bandSegment = (v: string|null) => v && v != '_' ? v : null;

   const type = typeFromString(params[0]);
   const bands: Band[] = new Array<Band>(type);
   for (let i=0; i<type; i++) {
      bands[i] = bandSegment(params[i+1]);
   }

   return { type, bands };
}

export class ResistorState {
   constructor() {
      const state = stateFromUrl();
      history.replaceState(state, '', `${stateToUrl(state).toString()}`);
      this.onPopState(state);

      window.addEventListener('popstate', (event) => this.onPopState(event.state));
   }

   private onPopState(state: UrlState) {
      // state can be null when user alters URL fragment
      if (!state) {
         state = stateFromUrl();
      }

      this._type = state.type;

      const bands = [...state.bands];

      this._value1 = getColourValue(bands.shift()!, valueColours);
      this._value2 = getColourValue(bands.shift()!, valueColours);
      if (this.type == ResistorType.FiveBand) {
         this._value3 = getColourValue(bands.shift()!, valueColours);
      }
      this._multiplier = getColourValue(bands.shift()!, multiplierColours);
      this._tolerance = getColourValue(bands.shift()!, toleranceColours);
   }

   private saveState() {
      const state: UrlState = {
         type: this.type,
         bands: this.bands.map((v) => v ? v.colour.name.toLowerCase() : null)
      }

      history.pushState(state, '', `${stateToUrl(state).toString()}`);
   }

   get bands() {
      if (this.type == ResistorType.FiveBand) {
         return [
            this._value1,
            this._value2,
            this._value3,
            this._multiplier,
            this._tolerance
         ];
      } else {
         return [
            this._value1,
            this._value2,
            this._multiplier,
            this._tolerance
         ];
      }
   }

   private _type = $state(ResistorType.FourBand);
   private _value1?: ColourValue = $state();
   private _value2?: ColourValue = $state();
   private _value3?: ColourValue = $state();
   private _multiplier?: ColourValue = $state();
   private _tolerance?: ColourValue = $state();

   get type(): ResistorType {
      return this._type;
   }

   set type(val: ResistorType) {
      if (this._type == ResistorType.FiveBand && val == ResistorType.FourBand) {
         this.value3 = undefined;
      }

      this._type = val;

      this.saveState();
   }

   get value1(): ColourValue | undefined {
      return this._value1;
   }

   set value1(val: ColourValue | undefined) {
      this._value1 = val;
      this.saveState();
   }

   get value2(): ColourValue | undefined {
      return this._value2;
   }

   set value2(val: ColourValue | undefined) {
      this._value2 = val;
      this.saveState();
   }

   get value3(): ColourValue | undefined {
      return this._value3;
   }

   set value3(val: ColourValue | undefined) {
      this._value3 = val;
      this.saveState();
   }

   get multiplier(): ColourValue | undefined {
      return this._multiplier;
   }

   set multiplier(val: ColourValue | undefined) {
      this._multiplier = val;
      this.saveState();
   }

   get tolerance(): ColourValue | undefined {
      return this._tolerance;
   }

   set tolerance(val: ColourValue | undefined) {
      this._tolerance = val;
      this.saveState();
   }

   get isValid() {
      if (this.type == ResistorType.FiveBand) {
         return this.value1 && this.value2 && this.value3 && this.multiplier && this.tolerance;
      } else {
         return this.value1 && this.value2 && this.multiplier && this.tolerance;
      }
   }

   get resistance() {
      const vals = [this.value1, this.value2, this.value3]
         .filter((v) => v)
         .map((v) => v!.value)
         .join('');

      let val = parseInt(vals);

      if (this.multiplier) {
         val *= this.multiplier.value;
      }

      let suffix = '';
      if (val > 1000000) {
         val /= 1000000;
         suffix = 'M';
      } else if (val > 1000) {
         val /= 1000;
         suffix = 'k';
      }

      let tolerance = '';
      if (this.tolerance) {
         tolerance = `± ${this.tolerance.value}%`;
      }

      return `${val}${suffix} Ω ${tolerance}`;
   }
}