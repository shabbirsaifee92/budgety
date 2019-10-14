var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    exp: [],
    inc: []
  }

  return {
    addItem: function(type, description, value) {
      var newItem;
      
      if(data[type].length > 0){
        ID = data[type][data[type].length - 1].id + 1;
      } else{
        ID = 0;
      }
      
      if(type === 'inc') {
        newItem = new Income(ID, description, value);
      } else if(type === 'exp') {
        newItem = new Expense(ID, description, value);
      }
      data[type].push(newItem);
      return newItem;
    },
    testing: data
  }
})();

var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addInput: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list'
  };

  function getInput() {
    return {
      type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
      description: document.querySelector(DOMStrings.inputDescription).value,
      value: document.querySelector(DOMStrings.inputValue).value
    }
  };

  function addItem(item, type) {
    var html, newHtml, element;
    
    if(type === 'inc') {
      element = DOMStrings.incomeContainer;
      html = '<div class="item clearfix" id="income-%id%">\
      <div class="item__description">%description%</div>\
      <div class="right clearfix">\
      <div class="item__value">+ %value%</div>\
      <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else if(type === 'exp'){
      element = DOMStrings.expenseContainer;
      html = '<div class="item clearfix" id="expense-%id%">\
      <div class="item__description">%description%</div>\
      <div class="right clearfix">\
      <div class="item__value">- %value%</div>\
      <div class="item__percentage">21%</div>\
      <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }
    newHtml = html.replace('%id%', item.id).replace('%description%', item.description).replace('%value%', item.value);

    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
  }

  return {
    getDOMStrings: DOMStrings,
    getInput: getInput,
    addItem: addItem
  };
})();

// Global App Controller

var controller = (function(budgetCtrl, UICtrl) {

  var setUpEventListener = function() {
    var DOMStrings = UICtrl.getDOMStrings;

    document.querySelector(DOMStrings.addInput).addEventListener('click', addItem);

    document.addEventListener('keypress', function(event) {
      if(event.keyCode === 13 || event.which === 13){
        addItem();
      }
    });
  };

  var addItem = function() {
    var input, newItem;
    // 1. get input
    input = UICtrl.getInput();

    // 2. add the item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. add the item to UI
    UICtrl.addItem(newItem, input.type);
  };

  return {
    init: function() {
      console.log('Application has started');
      setUpEventListener();
    }
  }
})(budgetController, UIController);

controller.init();