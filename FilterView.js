// Below 2 functions are used to get the data for filter views and add a new filter view data into the sheet. This can be used as a hyperlink in the sheet to quickly access the filter view.

function getExistingFilterView(spreadSheetId, sheetName)
{
  var filterMap = {}
  var filterView = Sheets.Spreadsheets.get(spreadSheetId, {
    ranges: sheetName,
    fields: 'sheets/filterViews',
  }).sheets[0].filterViews;
  if(filterView != undefined)
  {
    for(var i in filterView)
    {
      var title = filterView[i].title;
      var filterId = filterView[i].filterViewId;
      filterMap[title] = filterId;
    }
  }
  return filterMap;
}

//Function to create new filter view. You can set the name of the filterview.

function createFilterView(spreadSheetId, sheetID, data, filterName, columnNo)
{
  //column No should be in index form.
  var hiddenArr = [];
  for(var i=0; i<data.length; i++)
  {
    if(data[i][1] != filterName)
    {
      hiddenArr.push(data[i][1]);
    }
  }
  var filterSetting = {
    range: {
      sheetId: sheetID
    },
    criteria: {},
    title: filterName
  }
 
  filterSetting['criteria'][columnNo] = {
    'hiddenValues': hiddenArr
  };
 
  var request = {
    "addFilterView": {
      "filter" : filterSetting
    }
  };
 
  Sheets.Spreadsheets.batchUpdate({'requests': [request]}, spreadSheetId);
}