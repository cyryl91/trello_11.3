$(function(){
function randomString(){
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	if(i = 0, i < 10, i++){
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}
function Column(name){
	var self = this; //zeby nie straciść kontekstu w funkcji createCards

	this.name = name;
	this.id = randomString();
	this.$element = createColumn();

function createColumn(){
//tworzenie segmerntu pierwszego, wygląd kolumnyu
var $column = $('<div>').addClass('column');
var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
var $columnCardList = $('<ul>').addClass('column-card-list');
var $columnDelete = $('<button>').addClass('btn-delete').text('delete column');
var $columnAddCard = $('<button>').addClass('add-card').text('add new card');
//nasluchiwacze na button w columnie	
	$columnDelete.click(function(){
		self.removeColumn();
	});
	$columnAddCard.click(function(){
		self.addCard(new Card(prompt("Enter the name of the card")));
	});
//konstruowanie kolumny
	$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);
//zwrocenie kolumny, wyswietlenie zbudowanej kolumny 
		return $column;
	}
}
//metoda, prototyp dodwanie carty, usuwanie kolumny
Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
};



function Card(description) {
	var self = this;

	this.id = randomString();
	this.description = description;
	this.$element = createCard();
//metoda, prototyp usuwanie carty
Card.prototype = {
	removeCard: function() {
		this.$element.remove();
}
}
function createCard(){
	var $card = $('<li>').addClass('card');
	var $cardDescription = $('<p>').addClass('card-description').text(self.description);
	var $cardDelete = $('<button>').addClass('btn-delete').text('x');

	$cardDelete.click(function(){
        self.removeCard();
	});
	$card.append($cardDelete)
    		.append($cardDescription);
    
    return $card;
	}
}
var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
};
function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }
 $('.create-column').click(function(){
	var name = prompt('Enter a column name');
	var column = new Column(name);
    	board.addColumn(column);
  });
})

