// Storage Controller
const StorageCtrl = (function(){

    // Public Methods
    return {
        storeItem: function(item){
            console.log('Storing in local storage...');
            let items;
            // Check for existing items
            if(localStorage.getItem('items') === null){
                items = [];
                // Push new item
                items.push(item);
                // Set LS
                localStorage.setItem('items', JSON.stringify(items));
                console.log('Item stored in local storage...');
                return true;
            } else{
                items = JSON.parse(localStorage.getItem('items'));
                // Push new item
                items.push(item);
                // Re set LS
                localStorage.setItem('items', JSON.stringify(items));
                console.log('Item stored in local storage...');
                return true;
            }            
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = []
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemInStorage: function(updatedItem){
            console.log('Updating item in local storage...');
            let items = JSON.parse(localStorage.getItem('items'));
            let status = false;
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    console.log('Item found in localStorage. Updating...');                    
                    items.splice(index, 1, updatedItem);
                }
            });

            try
            {
                localStorage.setItem('items', JSON.stringify(items))
                console.log('Item updated in local storage...');
                status = true;
            }
            catch{
                console.warn('Item not updated in local storage...');
            }
            return status;
        },
        deleteItemFromStorage: function(itemToDeleteID){
            console.log('Deleting item in local storage...');
            let items = JSON.parse(localStorage.getItem('items'));
            let status = false;
            items.forEach(function(item, index){
                if(itemToDeleteID === item.id){
                    console.log('Item found in localStorage. Updating...');                    
                    items.splice(index, 1);
                }
            });

            try
            {
                localStorage.setItem('items', JSON.stringify(items))
                console.log('Item deleted from local storage...');
                status = true;
            }
            catch{
                console.warn('Item not deleted from local storage...');
            }
            return status;
        },
        clearItemsFromStorage: function(){
            console.log('Clearing items from local storage...');       
            localStorage.removeItem('items');
        }
    }
})();

// Item Controller
const ItemCtrl = (function () {
    // Item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        // items: [
        //     // { id: 0, name: 'Steak Dinner', calories: 1200 },
        //     // { id: 1, name: 'Cookie', calories: 400 },
        //     // { id: 2, name: 'Eggs', calories: 200 },
        // ], // items array
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null, //this is for the current item
        totalCalories: 0
    }


    // Public Methods
    return {
        getItems: function () {
            console.log('Fetching data from store...'); 
            // console.log(`items from structure ${data.items}`);
            // console.log(`Items from storage ${StorageCtrl.getItemsFromStorage()}`);
            
            // return {
            //     structure : data.items,
            //     store: StorageCtrl.getItemsFromStorage()
            // };
            return data.items;
        },
        addItem: function (name, calories) {
            console.log('Generating ID for new item...');
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0
            }
            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items array
            if (data.items.push(newItem)) {
                console.log(`New Item Added. ID ${ID}`);
            } else {
                console.error('Error adding new item');
            }

            return newItem;
        },
        getTotalCalories: function () {
            console.log('Fetching calories...');
            let total = 0;

            // Loop through items and add calories
            data.items.forEach(function (item) {
                total += item.calories;
            });
            // Set total calories in data structure
            data.totalCalories = total;
            // Return total
            if (data.totalCalories === total) {
                console.log(`Setting total (${total}) calories in data structure...`);
                return data.totalCalories;
            } else {
                console.warn(`Setting total (${total}) calories in data structure failed!`);
                return data.totalCalories;
            }
        },
        getItemById: function (id) {
            let itemWithId = null;
            // Loop through items
            data.items.forEach(function (item) {
                if (item.id === id) {
                    itemWithId = item;
                }
            });
            return itemWithId;
        },
        setCureentItem: function (item) {
            if (data.currentItem = item) {
                console.log('Current item value set.');
            } else {
                console.warn('Unable to set current item value');
            }
        },
        getCurrentItem: function () {
            return data.currentItem;
        },
        updateItem: function (name, calories) {
            // Calories to number
            calories = parseInt(calories);
            let itemToUpdate = null

            // Loop through items
            data.items.forEach(function (item) {
                if (item.id === data.currentItem.id) {
                    console.log('Updating item data in data structure...');
                    // Update data in data structure
                    itemToUpdate = item;
                    item.name = name;
                    item.calories = calories;
                }
            });
            if (itemToUpdate !== null) {
                console.log('Item data in data structure updated.');
                return itemToUpdate;
            } else {
                console.warn('Item data in data structure not updated');
                return false;
            }
        },
        deleteItem: function (id) {
            let deleted = false;
            // get items ids
            ids = data.items.map(function (item) {
                return item.id;
            });
            // Get index
            const index = ids.indexOf(id);
            //Remove item
            try{
                data.items.splice(index, 1);
                console.log('Current item data deleted from data structure');
                deleted = true
            }catch{
                console.log('Current item data not deleted from data structure');
                deleted = false;
            }
            return deleted;
        },
        clearAllItems: function(){
            data.items = [];
            if(data.items.length <= 0){
                console.log('Items data cleared from store.');   
                return true;      
            }else{
                console.warn('Unable to clear items data from store');  
                return false;
            }
        },
        logData: function () {
            return data;
        }
    }
})();

// UI Controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearAllBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        listItems: '#item-list li',
    }

    // Public Methods
    return {
        populateItemList: function (items) {
            if (items.length > 0) {
                console.log(`(${items.length}) items fetched from store`)
                let html = '';
                items.forEach(function (item) {
                    html += `
                    <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="fa fa-pencil edit-item"></i>
                        </a>
                    </li>
                    `;
                });

                // Insert list items
                const itemsList = document.querySelector(UISelectors.itemList);
                const initUlNodesLength = itemsList.childNodes.length;
                itemsList.innerHTML = html;
                let itemNodes = ((itemsList.childNodes.length - 1) / 2);
                if (itemNodes >= initUlNodesLength) {
                    console.log(`(${itemNodes}) li items inserted to UI`);
                } else {
                    console.error('No insert to UI');
                }
            } else {
                console.warn(`(${items.length}) items fetched from store`)
            }
        },
        getUISelectors: function () {
            return UISelectors;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },
        addListItem: function (item) {
            //Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            console.log('creating UI elements');
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil edit-item"></i>
                </a>
            `;
            // Insert item
            console.log('Inserting UI elements');
            if (document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)) {
                console.log('UI elements inserted.');
            }
        },
        updateListItem: function (item) {
            console.log('Getting list items from UI...');
            let listItems = document.querySelectorAll(UISelectors.listItems);
            let updateState = false;

            // Convert node list to array
            listItems = Array.from(listItems);
            // Loop through array
            listItems.forEach(function (listItem) {
                const itemID = listItem.getAttribute('id');
                if (itemID === `item-${item.id}`) {
                    console.log(`Updating list items (name - ${item.name} and calories - ${item.calories}) in UI...`);

                    document.querySelector(`#${itemID}`).innerHTML =
                        `
                    <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="fa fa-pencil edit-item"></i>
                    </a>
                    `;
                    updateState = true;
                }

            });

            return updateState;
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            console.log(item);            
            try{
                item.remove()
                console.log(`Item with id ${id} removed from UI.`);
                return true;
            }catch{
                console.warn('Unable to delete Item from UI');          return false;    
            }
        },
        clearInput: function () {
            console.log('Clearing Inputs...');
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function (totalCalories) {
            if (document.querySelector(UISelectors.totalCalories).textContent = totalCalories) {
                console.log(`UI total calories value updated to ${totalCalories}.`);
            } else {
                console.log(`UI total calories value (${totalCalories}) not changes`);
            }
        },
        clearFormState: function () {
            // Clear inputs
            UICtrl.clearInput();
            // Hide update and delete btns
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        removeAllItems: function (){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into array
            listItems = Array.from(listItems);
            console.log(listItems.length);
            
            try{
                listItems.forEach(function(item){
                    item.remove();
                    console.warn(item);                
                });
                return true;
            }catch{
                return false;
            }
        },
        showBtnState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        addItemToForm: function () {
            console.log('Adding selected item value to input fields');
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showBtnState();
        }
    }

})();

// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl, StorageCtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // Get UI Selectors
        const UISelectors = UICtrl.getUISelectors();

        // Add item events
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable Submit on enter
        document.addEventListener('keypress', function (e) {
            // Modify to allow enter for update when add btn is disabled
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        })

        // Update item click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Back btn event
        document.querySelector(UISelectors.backBtn).addEventListener('click', function (e) {
            console.log('Resetting form state...');
            UICtrl.clearFormState();
            console.log('Form state resetted.');
            e.preventDefault()
        });

        // / Clear item event
        document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllItemsClick);

    }

    // Add item submit
    const itemAddSubmit = function (e) {
        console.log('.........Add new item process........');
        console.log('Getting input values from UI');
        // Get form input from UI controller
        const input = UICtrl.getItemInput();
        //Check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            console.log('Process form inputs before storing');
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add item to UI list
            console.log('Adding new item to UI...');
            UICtrl.addListItem(newItem);
            // Get total calories
            console.log('Computing total calories...');
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            console.log(`Updating UI total calories value (${totalCalories})...`);
            UICtrl.showTotalCalories(totalCalories);
            //Store in LS
            StorageCtrl.storeItem(newItem);
            // Clear fields
            UICtrl.clearInput();
        } else {
            console.warn('Please Check input fields. Both Meal and Calorie Value needed');
        }
        e.preventDefault()
    }

    // Update item click
    const itemUpdateClick = function (e) {
        if (e.target.classList.contains('edit-item')) {
            // Get list item id
            console.log('Getting list item id...');
            const listId = e.target.parentNode.parentNode.id;
            //Break into an array
            const listIdArray = listId.split('-');
            // Get actual id
            const id = parseInt(listIdArray[1]);
            // Get item
            console.log('Getting item to edit...');
            const itemToEdit = ItemCtrl.getItemById(id);
            if (itemToEdit) {
                // Set current item
                console.log('Setting current item value to edit...');
                ItemCtrl.setCureentItem(itemToEdit);
                // Add item to form
                UICtrl.addItemToForm();
            } else {
                console.log(`item with id of - (${id}) not found.`);
            }
        }

        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function (e) {
        // Get item input
        console.log('.........Update item process........');
        console.log('Getting input values for update process...');
        const input = UICtrl.getItemInput();
        //Update item
        console.log('Updating item...');
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        if (updatedItem) {
            // Updating UI
            console.log('Updating item data in UI...');
            if (UICtrl.updateListItem(updatedItem)) {
                console.log('Item data updated in UI.');
                // Get total calories
                console.log('Computing total calories...');
                const totalCalories = ItemCtrl.getTotalCalories();
                // Add total calories to UI
                console.log(`Updating UI total calories value (${totalCalories})...`);
                UICtrl.showTotalCalories(totalCalories);
                // Update LS
                StorageCtrl.updateItemInStorage(updatedItem);
                // Clear edit state
                UICtrl.clearFormState();
            } else {
                console.warn('Unable to update item in UI. Update process aborted.');
            }
        } else {
            console.warn('Unable to update item in data structure. Update process aborted.');
        }

        e.preventDefault()
    }

    // Delete btn event
    const itemDeleteSubmit = function (e) {
        // Get current item
        console.log('.........Delete item process........');
        console.log('Getting current item...');
        const currentItem = ItemCtrl.getCurrentItem();
        // Delete from data structure
        console.log('Deleting current item from data structure...');
        if (ItemCtrl.deleteItem(currentItem.id)) {
            // Delete from UI
            console.log('Deleting current item from UI...');
            if(UICtrl.deleteListItem(currentItem.id)){
                console.log('Items List updated in UI.');
                // Get total calories
                console.log('Computing total calories...');
                const totalCalories = ItemCtrl.getTotalCalories();
                // Add total calories to UI
                console.log(`Updating UI total calories value (${totalCalories})...`);
                UICtrl.showTotalCalories(totalCalories);
                // Update from LS
                StorageCtrl.deleteItemFromStorage(currentItem.id);
                // Clear edit state
                UICtrl.clearFormState();
            }
        } else {
            console.warn('Deleting current item from data structure failed.');
        }

        e.preventDefault();
    }

    // Clear items event
    const clearAllItemsClick = function(e) {
        console.log('.........Clear all items process........');
        console.log('Deleting all items from data structure...');
        //Delete all items from data structure
        if(ItemCtrl.clearAllItems()){
            console.log('Deleting all items from UI...');
            if(UICtrl.removeAllItems()){
                console.log('Items list cleared from UI.');
                // Get total calories
                console.log('Computing total calories...');
                const totalCalories = ItemCtrl.getTotalCalories();
                // Add total calories to UI
                console.log(`Updating UI total calories value (${totalCalories})...`);
                UICtrl.showTotalCalories(totalCalories);
                // Clear edit state
                UICtrl.clearFormState(); 
                // Clear items from LS
                StorageCtrl.clearItemsFromStorage();
                // Hide list
                UICtrl.hideList();
            }else{
                console.warn('Unable to clear items data from UI...'); 
            }
        }else {
            console.warn('Unable to clear items data...');            
        }

        e.preventDefault()
    }

    // Public methods
    return {
        init: function () {
            console.log('Initializing App..');
            UICtrl.clearFormState();
            // Set UI btns initial state
            const items = ItemCtrl.getItems();
            if (items.length > 0) {
                console.log('Data Fetched.');
                // Populate list with items
                console.log("Loading data to UI..");
                UICtrl.populateItemList(items);
            } else {
                UICtrl.hideList();
                console.log('No data found in store');
            }
            // Get total calories
            console.log('Computing total calories...');
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            console.log(`Updating UI total calories value (${totalCalories})...`);
            UICtrl.showTotalCalories(totalCalories);

            // Load event listeners
            loadEventListeners();

        }
    }
})(ItemCtrl, UICtrl, StorageCtrl);



// Initialize App
AppCtrl.init()