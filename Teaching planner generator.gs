function _populateDatesForClass(class1, timetable, class1Range, outputRange, offset) {
  let row = 0;
  for (let i=0; i<timetable.length; i++) {
    let today = timetable[i];
    if (class1.includes( today.dayNumber )) {
      let date = today.date;
      outputRange.getCell(row+1, offset).setValue( date );
      row++;
    }
  }  
}

function _getDayNumbersForClass(class1Range) {
  let class1 = []
  for (let row=1; row<class1Range.getNumRows(); row++) {
    let dayNumber = class1Range.getCell(row, 1).getValue();
    if (! isNaN(dayNumber)) {
      if (dayNumber >= 1 && dayNumber <= 10) {
        class1.push(dayNumber);    
      }
    };
  }
  return class1;
}
  
function generate(classNumber) {
  // Named ranges
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let datesRange = spreadsheet.getRangeByName('Dates');
  let class1Range = spreadsheet.getRangeByName('Class1');
  let class2Range = spreadsheet.getRangeByName('Class2');
  let class3Range = spreadsheet.getRangeByName('Class3');
  let class4Range = spreadsheet.getRangeByName('Class4');
  let outputRange = spreadsheet.getRangeByName('Output');

  // Get the timetable
  let timetable = [];
  for (let row=1; row<datesRange.getNumRows(); row++) {
    let date = datesRange.getCell(row, 1).getValue();
    let dayNumber = datesRange.getCell(row, 2).getValue();
    if (! isNaN(dayNumber)) {
      timetable.push( { 'date': date, 'dayNumber' : dayNumber } );    
    };
  }

  // Get the day numbers for individual classes
  let class1 = _getDayNumbersForClass(class1Range);
  let class2 = _getDayNumbersForClass(class2Range);
  let class3 = _getDayNumbersForClass(class3Range);
  let class4 = _getDayNumbersForClass(class4Range);
  
  // Generate output
  outputRange.clearContent();
  _populateDatesForClass(class1, timetable, class1Range, outputRange, 1);
  _populateDatesForClass(class2, timetable, class2Range, outputRange, 2);
  _populateDatesForClass(class3, timetable, class3Range, outputRange, 3);
  _populateDatesForClass(class4, timetable, class4Range, outputRange, 4);
}
