//Storage Controller
const StorageCtrl = (function(){
    
    //Public Methods
    return {
        storeItem: function(item){
            let items;
            
            //check if any items in localStorage
            if (localStorage.getItem('items') === null){    //nothing in localStorage
                items = [];
                
                //Push new item
                items.push(item);

                //Set localStorage
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //get from local storage
                items = JSON.parse(localStorage.getItem('items'));

                //Push new item
                items.push(item)

                //Reset Local Storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },

        //get Items from localstorage
        getItemsFromStorage: function(){
            let items;

            if (localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },

        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();



//Item Controller
const ItemCtrl = (function(){
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
        // items: [
        //     // {id: 0, name: 'Meal', calories: 1200},
        //     // {id: 1, name: 'Milk', calories: 600},
        //     // {id: 2, name: 'Ice Cream', calories: 400}
        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    //Public Methods
    return {

        getItems: function(){
            return data.items;
        },

        addItem: function(name, calories){
            //Create item id
            let ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Calories to number
            calories = parseInt(calories);

            //Create new Item
            newItem = new Item(ID, name, calories);
            
            //Push newItem to items data structures
            data.items.push(newItem);

            return newItem;
        },

        getItemByID: function(id){
            let found = null;

            //loop through items to find item with id
            data.items.forEach(function(item){
                if(item.id === id) {
                    found = item;
                }
            })

            return found;
        },

        updateItem: function(name, calories){
            //calories to number
            calories = parseInt(calories)

            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })

            return found;
        },

        deleteItem: function(id){
            //Get ids
            const ids = data.items.map(function(item){
                return item.id
            });

            //get index
            const index = ids.indexOf(id);

            //Remove Item
            data.items.splice(index, 1);
        },

        clearAllItems: function(){
            data.items = [];
        },

        setCurrentItem: function(item){
            data.currentItem = item;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        getTotalCalories: function(){
            let total = 0;

            //loop through items array and calories
            data.items.forEach(function(item){
                total += item.calories;
            });

            //set total calories in data array
            data.totalCalories = total;

            return data.totalCalories;
        },

        logData: function(){
            return data;
        }
    }
})();



//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
    }
    
    //Public Methods
    return{
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `
            });

            //Insert List Items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },

        addListItem: function(item){
            //Show UI list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //create 'li' element
            const li = document.createElement('li');
            //Add class
            li.className = 'collection-item';
            //Add id
            li.id = `item-${item.id}`;
            //Add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            //Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //Turn nodelist to array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>
                    `;
                }
            });
        },

        deleteListItem: function(id){
            const itemID = `#item-${id}`;

            const item = document.querySelector(itemID);
            item.remove();
        },

        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

            UICtrl.showEditState();
        },

        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            
            listItems = Array.from(listItems)

            listItems.forEach(function(item){
                item.remove();
            })
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: function(){
            return UISelectors;
        }
    }
})();



//App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    //Load event listeners
    const loadEventListeners = function(){
        //Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable submit on ENTER
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });

        //Edit icon event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //Update Item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //Delete Item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //Back Button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        //Clear ALL event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    //Add item event
    const itemAddSubmit = function(e){
        //Get form input from UICtrl
        const input = UICtrl.getItemInput();

        //Check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            //Add item to items array 
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            //Add newItem to UI list
            UICtrl.addListItem(newItem);

            //Get total Calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //Disaplay total calories in UI
            UICtrl.showTotalCalories(totalCalories);

            //Store in Local Storage
            StorageCtrl.storeItem(newItem);

            //Clear form fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    //Edit item event
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            //Get list item ID (item-0, item-1 ...)
            const listID = e.target.parentNode.parentNode.id

            //break item id
            const listIDArr = listID.split('-');

            // Get ID number
            const id = parseInt(listIDArr[1]);

            // Get the item
            const itemToEdit = ItemCtrl.getItemByID(id);
            
            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            //Add Item to Edit to form
            UICtrl.addItemToForm();
        } 
        e.preventDefault()
    }

    //Item Update event
    const itemUpdateSubmit = function(e){
        //Get Item input
        const input = UICtrl.getItemInput();

        //Update Item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        //Update Item in UI
        UICtrl.updateListItem(updatedItem);

        //Get total Calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Disaplay total calories in UI
        UICtrl.showTotalCalories(totalCalories);

        //Update Local Storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    //Item Delete Event
    const itemDeleteSubmit = function(e){
        //Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //Delete from Data Structure
        ItemCtrl.deleteItem(currentItem.id);
        
        //Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        //Get total Calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Disaplay total calories in UI
        UICtrl.showTotalCalories(totalCalories);

        //Delete from Local Storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    //Clear Items Event
    const clearAllItemsClick = function(){
        //Delete all items from data structure
        ItemCtrl.clearAllItems();

        //Get total Calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Disaplay total calories in UI
        UICtrl.showTotalCalories(totalCalories);

        //Clear UI
        UICtrl.removeItems();

        //Clear localStorage
        StorageCtrl.clearItemsFromStorage();

        //Hide UL
        UICtrl.hideList();

    }

    //Public Methods
    return{
        init: function(){
            //Set initial state
            UICtrl.clearEditState();

            //fetch Items from ItemCtrl Data Structure
            const items = ItemCtrl.getItems();

            //Check if any items 
            if(items.length === 0){
                UICtrl.hideList();
            } else {
                //Add items to list
                UICtrl.populateItemList(items);
            }
            
            //Get total Calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //Disaplay total calories in UI
            UICtrl.showTotalCalories(totalCalories);

             //Load event listeners
             loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);


//Initialize App
App.init();