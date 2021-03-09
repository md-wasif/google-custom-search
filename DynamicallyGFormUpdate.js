var gFormID = "1eVwn36JR7eykqHAd5P9IEZzpJ_g2xXO8AArrbdQBsbE";
var gForm = FormApp.openById(formID);


function main()
{
    
    var labels = wsData.getRange(2, 1, wsData.getLastRow() - 1, 1).getValues();
    
    var ManagersName = [];
    for(var i=0; i<labels.length; i++)
    {
       ManagersName.push(labels[i][0]);
    }
    getIdsAndValues(ManagersName);
    /*labels.forEach(function(label, i){
         var options = wsData.getRange(2, i + 1, wsData.getLastRow() - 1, 1)
         .getValues()
         .map(function(o){return o[0]})
         .filter(function(o){return o !== "" });
        
        myFunction(label, options);
    });
    */
}

//function myFunction(title, values)
function getIdsAndValues(values)
{
    var title = "Manager's Name";
    var items = form.getItems();
    var titles = items.map(function(item){
       return item.getTitle();
    });
    
    var pos = titles.indexOf(title);
    var item = items[pos];
    var itemID = item.getId();
    
    UpdateDropdownGForms(itemID, values)
 }


function UpdateDropdownGForms(ID, values) 
{
    var item = form.getItemById(ID);
    item.asListItem().setChoiceValues(values);
}
