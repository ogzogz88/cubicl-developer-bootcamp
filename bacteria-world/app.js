$(document).ready(function() {

var sim = {
	init : function(settings) {

		var i=10;
		while(i--){
			this._createSource();
		}

		this._placeCells(settings.cellNum);
		this._placeSources();
		this._bindClick();

		var context = this;
		//simulation loop
		this._framePeriod = settings.frameP;
		setInterval (function() { context.loop(); }, this._framePeriod);

		//window update loop
		setInterval (function() { context.windowLoop(); }, 200);

		//source loop
		setInterval (function() { context.sourceLoop(); }, 500);
	},

	loop : function() {

		for(var i=0, len = this._cells.length; i<len; i++){

			var cell = this._cells[i];

			if(cell.alive){

				this.perception(cell);
				this.targetContact(cell);
				this.feed(cell);
				this.bodyEnergyConsumption(cell);
				this.move(cell);
				this.metabolism(cell);
				this.death(cell);
			}

			this.stream(cell);


			this.view(cell);
		}
	},

	windowLoop : function() {

		if(this._windowItem.type){

			if(this._windowItem.type == "cell"){
				this._updateWindow(this._windowItem.cell, this._windowItem.id, "cell");
			}
		}
	},

	sourceLoop : function() {

		var i, len, source, r;

		for(i=0, len=this._sources.length; i<len; i++){

			source = this._sources[i];
			if(source !== null && source.type != "light"){

				if(source.amount < 0.4){
					source.$.fadeOut().remove();
					source = null;
				}
				else{
					r = Math.sqrt(source.amount)*2.5;
					source.r = r;

					source.$.find(".source").css({
						width	: source.r*2,
						height	: source.r*2
					});
					source.$.css({
						left	: source.x-source.r,
						top		: source.y-source.r,
					});
				}
			}
		}
	},

	view : function(cell) {
		//update position
		if(cell.view.left !== null){
			cell.$.css({left: cell.view.left});
			cell.view.left = null;
		}

		if(cell.view.top !== null){
			cell.$.css({top: cell.view.top});
			cell.view.top = null;
		}

		//direction
		if(cell.view.direction !== null){
			cell.$.css({transform: "rotate("+(-1*cell.view.direction)+"deg)"});
			cell.view.direction = null;
		}

		//size
		if(cell.view.width !== null){
			cell.$.find(".cell").css({width: Math.round(cell.view.width)});
			cell.view.width = null;
		}

		if(cell.view.height !== null){
			cell.$.find(".cell").css({height: Math.round(cell.view.height)});
			cell.view.height = null;
		}

		//death
		if(cell.view.death == true){
			cell.$.addClass("dead");
			cell.view.death = null;
		}

	},

	death : function(cell) {

		if(cell.energy < 0){
			cell.alive = false;
			cell.view.death = true;
		}
	},

	move : function(cell) {

		var indexOfMove = this._indexOf(cell.mechanisms, "name", "Move");
		var direction;

		//get speed
		if(indexOfMove === null){
			speed = 0;
			cell.moving = false;
			return;
		}
		else{
			speed = cell.mechanisms[indexOfMove].speed;
			efficiency = cell.mechanisms[indexOfMove].eff;
		}

		//move randomly if there is no target and not feeding
		if(cell.feeding === false && cell.target.x === null){

			if(Math.random() < 0.015){
				direction = Math.floor(Math.random()*360);
				cell.direction = direction;
			}
			if(Math.random() < 0.005){

				cell.moving = !cell.moving;
			}
		}

		//set direction to the target if exists
		if(cell.target.x !== null && cell.target.y !== null){

			direction = Math.floor(Math.atan((cell.y-cell.target.y)/(cell.target.x-cell.x))*180/Math.PI);
			if(cell.target.x-cell.x < 0){
				direction += 180;
			}
			cell.direction = direction;
		}

		//turn back when reached to the border
		var world = {
			x1: 0,
			x2: $("#world").width(),
			y1: 0,
			y2: $("#world").height(),
			x: $("#world").width()/2,
			y: $("#world").height()/2
		};

		var cellPos = {
			x: cell.x + cell.$.width()/2,
			y: cell.y + cell.$.height()/2
		};

		if(cellPos.x < world.x1 || cellPos.x > world.x2 || cellPos.y < world.y1 || cellPos.y > world.y2){
			direction = Math.floor(Math.atan((cellPos.y-world.y)/(world.x-cellPos.x))*180/Math.PI);
			if(world.x-cellPos.x < 0){
				direction += 180;
			}
			cell.direction = direction;
			cell.moving = true;
		}

		//move
		if(cell.moving && !cell.feeding){
			direction = cell.direction;

			cell.x += speed*Math.cos(direction/180*Math.PI)*this._framePeriod/1000;
			cell.y += -1*speed*Math.sin(direction/180*Math.PI)*this._framePeriod/1000;

			cell.view.left = cell.x;
			cell.view.top = cell.y;
			cell.view.direction = direction;

			//energy decrease 1/100000 energy per pixel per body point over efficiency
			cell.energy -= speed*this._framePeriod*cell.body/efficiency/100000000;
			if(isNaN(cell.energy)){
				console.log("move: "+cell.energy);
			}

		}
	},

	perception: function(cell) {

		if(Math.random() < 0.9){
			return;
		}

		var i=0, len=0, probability, indexOfMech, source, distance, distanceFactor, targets = [], bestTarget, targetPoint=0;

		//sugar perception
		indexOfMech = this._indexOf(cell.mechanisms, "name", "SugarPerception");
		if(indexOfMech !== null){

			probability = cell.mechanisms[indexOfMech].probability;

			for(i=0, len=this._sources.length; i<len; i++){
				if(this._sources[i] && this._sources[i].type == "sugar"){

					source = this._sources[i];
					distance = Math.abs(Math.sqrt((cell.x-source.x)*(cell.x-source.x)+(cell.y-source.y)*(cell.y-source.y))-source.r-Math.sqrt(cell.size.x*cell.size.y));

					targets.push({distance: distance, probability: probability, x: source.x, y: source.y});
				}
			}
		}

		//fat perception
		indexOfMech = this._indexOf(cell.mechanisms, "name", "FatPerception");
		if(indexOfMech !== null){

			probability = cell.mechanisms[indexOfMech].probability;

			for(i=0, len=this._sources.length; i<len; i++){
				if(this._sources[i] && this._sources[i].type == "fat"){

					source = this._sources[i];
					distance = Math.abs(Math.sqrt((cell.x-source.x)*(cell.x-source.x)+(cell.y-source.y)*(cell.y-source.y))-source.r-Math.sqrt(cell.size.x*cell.size.y/4));

					targets.push({distance: distance, probability: probability, x: source.x, y: source.y});
				}
			}
		}

		//amino perception

		indexOfMech = this._indexOf(cell.mechanisms, "name", "AminoPerception");
		if(indexOfMech !== null){

			probability = cell.mechanisms[indexOfMech].probability;

			for(i=0, len=this._sources.length; i<len; i++){
				if(this._sources[i] && this._sources[i].type == "amino"){

					source = this._sources[i];
					distance = Math.abs(Math.sqrt((cell.x-source.x)*(cell.x-source.x)+(cell.y-source.y)*(cell.y-source.y))-source.r-Math.sqrt(cell.size.x*cell.size.y/4));

					targets.push({distance: distance, probability: probability, x: source.x, y: source.y});
				}

			}
		}

		//light perception
		indexOfMech = this._indexOf(cell.mechanisms, "name", "LightPerception");
		if(indexOfMech !== null){

			probability = cell.mechanisms[indexOfMech].probability;

			for(i=0, len=this._sources.length; i<len; i++){
				if(this._sources[i] && this._sources[i].type == "light"){

					source = this._sources[i];
					distance = Math.sqrt((cell.x-source.x)*(cell.x-source.x)+(cell.y-source.y)*(cell.y-source.y))-source.r-Math.sqrt(cell.size.x*cell.size.y/4);

					//for light detection cell should be under light
					if(distance > 0){
						probability = 0;
					}

					targets.push({distance: Math.abs(distance), probability: probability, x: source.x, y: source.y});
				}
			}
		}


		//select the best target
		for(i=0, len=targets.length; i<len; i++){

			distance = targets[i].distance;
			probability = targets[i].probability;

			if(probability/distance > targetPoint){
				bestTarget = targets[i];
				targetPoint = probability/distance;
			}
		}

		if(bestTarget){
			distanceFactor = (100/bestTarget.distance) < 1 ? (100/bestTarget.distance) : 1;

			if(Math.random() < bestTarget.probability*distanceFactor){
				cell.target.x = bestTarget.x;
				cell.target.y = bestTarget.y;

			}
			else{
				cell.target.x = null;
				cell.target.y = null;
			}
		}
	},

	stream: function(cell) {

		var direction, speed;

		//change stream with a low probability
		if(Math.random() < 0.1/(1000/this._framePeriod)){
			cell.stream.speed += Math.random()*5-2.5;

			//cell.stream.speed = cell.stream.speed < 15 ? cell.stream.speed : 15;
			//cell.stream.speed = cell.stream.speed > -15 ? cell.stream.speed : -15;

			if(Math.random() < 0.1){
				cell.stream.direction = Math.floor(Math.random()*360);
			}
		}

		//stop when reached to the border if has no ability to move
		if(this._indexOf(cell.mechanisms, "name", "Move") === null || !cell.alive){
			var world = {
				x1: 0,
				x2: $("#world").width(),
				y1: 0,
				y2: $("#world").height()
			};

			var cellPos = {
				x: cell.x + cell.$.width()/2,
				y: cell.y + cell.$.height()/2
			};

			if(cellPos.x < world.x1){
				cell.stream.direction = 0;
				cell.stream.speed = Math.abs(cell.stream.speed);
			}
			if(cellPos.x > world.x2){
				cell.stream.direction = 180;
				cell.stream.speed = Math.abs(cell.stream.speed);
			}
			if(cellPos.y < world.y1){
				cell.stream.direction = 270;
				cell.stream.speed = Math.abs(cell.stream.speed);
			}
			if(cellPos.y > world.y2){
				cell.stream.direction = 90;
				cell.stream.speed = Math.abs(cell.stream.speed);
			}
		}

		direction = cell.stream.direction;
		speed = cell.stream.speed;

		cell.x += speed*Math.cos(direction/180*Math.PI)*this._framePeriod/1000;
		cell.y += -1*speed*Math.sin(direction/180*Math.PI)*this._framePeriod/1000;

		cell.view.left = cell.x;
		cell.view.top = cell.y;
	},

	feed : function(cell) {
		//get absorption mechanism data
		var indexOfAbs, speed, absorptionSpeed, source, id, sourceIndex;
		indexOfAbs = this._indexOf(cell.mechanisms, "name", "Absorption");

		if(indexOfAbs === null){
			cell.absorption = false;
			return;
		}

		speed = cell.mechanisms[indexOfAbs].speed;
		id = cell.targetSource;

		if(id === null){
			return;
		}

		sourceIndex = this._indexOf(this._sources, "id", id);
		if(sourceIndex !== null){
			source = this._sources[this._indexOf(this._sources, "id", id)];
		}
		else{
			cell.targetSource = null;
			cell.feeding = false;
			return;
		}

		if(source.amount <= 0){
			cell.targetSource = null;
			cell.moving = true;
			cell.feeding = false;
			return;
		}
		absorptionSpeed = (cell.body/3-cell.stock[source.type])/(cell.body/3)*speed*this._framePeriod/1000;

		source.amount -= absorptionSpeed;
		cell.stock[source.type] += absorptionSpeed;
	},

	targetContact : function(cell) {

		if(!cell.absorption){
			return;
		}
		var distance, source, perception;

		perception = {
			sugar : false,
			fat : false,
			light : false,
			amino : false
		};

		if(this._indexOf(cell.mechanisms, "name", "Sugar") !== null){
			perception.sugar = true;
		}
		if(this._indexOf(cell.mechanisms, "name", "Fat") !== null){
			perception.fat = true;
		}
		if(this._indexOf(cell.mechanisms, "name", "Light") !== null){
			perception.light = true;
		}
		if(this._indexOf(cell.mechanisms, "name", "Amino") !== null){
			perception.amino = true;
		}

		//if there is a contact with sources, stop and feed
		for(var i=0, len=this._sources.length; i<len; i++){

			source = this._sources[i];
			if(!source){
				if(cell.feeding){
					cell.feeding = false;
					cell.moving = true;
				}
				cell.target.x = null;
				cell.target.y = null;
				continue;
			}

			if(!perception[source.type]){
				continue;
			}

			//distance between centers - source radius with 25% margin - approximate cell radius with 25% margin
			distance = Math.sqrt((source.x-cell.x-cell.size.x/2)*(source.x-cell.x-cell.size.x/2)+(source.y-cell.y-cell.size.y/2)*(source.y-cell.y-cell.size.y/2))-source.r-Math.sqrt(cell.size.x*cell.size.y/4);

			if(source.type == "light"){
				distance += 25;
			}

			if(distance <= 0){
				cell.moving = false;
				cell.feeding = true;
				cell.targetSource = source.id;
				break;
			}
			else{
				cell.feeding = false;
				cell.moving = true;
				cell.targetSource = null;
			}
		}
	},

	metabolism : function(cell) {

		this._lightAbsorption(cell);
		this._sugarMetabolism(cell);
		this._fatMetabolism(cell);
		this._aminoMetabolism(cell);

	},

	_lightAbsorption : function(cell) {

		var indexOfMech, distance, i, len, source, efficiency, producedEnergy, rate, productionCapacity;

		indexOfMech = this._indexOf(cell.mechanisms, "name", "Light");

		//has light metabolism?
		if(indexOfMech !== null){

			efficiency = cell.mechanisms[indexOfMech].eff;
			rate = cell.mechanisms[indexOfMech].rate*(cell.body/25);

			//is there light?
			for(i=0, len=this._sources.length; i<len; i++){

				if(this._sources[i] && this._sources[i].type == "light"){
					source = this._sources[i];

					distance = Math.sqrt((cell.x-source.x)*(cell.x-source.x)+(cell.y-source.y)*(cell.y-source.y))-source.r-Math.sqrt(cell.size.x*cell.size.y/4);

					//if there is light
					if(distance < 0){

						producedEnergy = source.amount*efficiency*this._framePeriod/1000;
						productionCapacity = 1000*rate*efficiency*this._framePeriod/1000;

						//produce
						if(productionCapacity > producedEnergy){

							cell.energy += producedEnergy;
						}
						else{
							cell.energy += productionCapacity;
						}

						if(isNaN(cell.energy)){
				console.log("light: "+cell.energy);
			}

						return;
					}
				}
			}
		}
	},

	_sugarMetabolism: function(cell) {

		var indexOfMech, productionCapacity, producedEnergy, efficiency, rate;

		//has sugar metabolism
		indexOfMech = this._indexOf(cell.mechanisms, "name", "Sugar");
		if(indexOfMech !== null){

			efficiency = cell.mechanisms[indexOfMech].eff;
			rate = cell.mechanisms[indexOfMech].rate*(cell.body/25);

			//is there sugar
			if(cell.stock.sugar > 0.001){

				productionCapacity = rate*this._framePeriod/1000*efficiency*this._energy.sugar;
				producedEnergy = cell.stock.sugar*this._framePeriod/1000*efficiency*this._energy.sugar;

				//produce
				if(productionCapacity > producedEnergy){

					cell.energy += producedEnergy;
					cell.stock.sugar -= cell.stock.sugar*this._framePeriod/1000;
				}
				else{
					cell.energy += productionCapacity;
					cell.stock.sugar -= rate*this._framePeriod/1000;
				}
				if(isNaN(cell.energy)){
				console.log("sugar: "+cell.energy);
			}
			}
		}
	},

	_fatMetabolism: function(cell) {

		var indexOfMech, productionCapacity, producedEnergy, efficiency, rate;

		//has fat metabolism
		indexOfMech = this._indexOf(cell.mechanisms, "name", "Fat");
		if(indexOfMech !== null){

			efficiency = cell.mechanisms[indexOfMech].eff;
			rate = cell.mechanisms[indexOfMech].rate*(cell.body/25);

			//is there fat
			if(cell.stock.fat > 0.001){

				productionCapacity = rate*this._framePeriod/1000*efficiency*this._energy.fat;
				producedEnergy = cell.stock.fat*this._framePeriod/1000*efficiency*this._energy.fat;

				//produce
				if(productionCapacity > producedEnergy){

					cell.energy += producedEnergy;
					cell.stock.fat -= cell.stock.fat*this._framePeriod/1000;
				}
				else{
					cell.energy += productionCapacity;
					cell.stock.fat -= rate*this._framePeriod/1000;
				}
				if(isNaN(cell.energy)){
				console.log("fat: "+cell.energy);
			}
			}
		}
	},

	_aminoMetabolism: function(cell) {

		var indexOfMech, productionCapacity, producedBody, efficiency, rate;

		//has amino metabolism
		indexOfMech = this._indexOf(cell.mechanisms, "name", "Amino");
		if(indexOfMech !== null){

			efficiency = cell.mechanisms[indexOfMech].eff;
			rate = cell.mechanisms[indexOfMech].rate*(cell.body/25);

			//is there amino
			if(cell.stock.amino > 0.001){

				productionCapacity = rate*this._framePeriod/1000*efficiency*this._energy.amino;
				producedBody = cell.stock.amino*this._framePeriod/1000*efficiency*this._energy.amino;

				//produce
				if(productionCapacity > producedBody){

					cell.body += producedBody;
					cell.stock.amino -= cell.stock.amino*this._framePeriod/1000;
				}
				else{
					cell.body += productionCapacity;
					cell.stock.amino -= rate*this._framePeriod/1000;
				}
				this._setCellSize(cell);
			}
		}
	},

	bodyEnergyConsumption : function(cell) {
		//energy consumption per body point is 1/1000 each second plus 1
		cell.energy -= (cell.body/1000+1)*(this._framePeriod/1000);
		if(isNaN(cell.energy)){
				console.log("body: "+cell.energy);
			}
	},

	_setCellSize : function(cell) {

		if(Math.random() < 0.9){
			return;
		}

		var ratio, x, y;

		ratio = cell.size.ratio;
		x = cell.size.x;
		y = cell.size.y;

		if(x/y > ratio){	//increase y
			y = (cell.body-2*x)/2;
		}
		else{				//increase x
			x = (cell.body-2*y)/2;
		}

		cell.view.width = x;
		cell.view.height = y;

		cell.size.x = x;
		cell.size.y = y;

	},

	_indexOf : function(array, key, value) {

		for(var i=0, len = array.length; i<len; i++){

			if(array[i] !== null){
				if(array[i][key] === value){

					return i;
				}
			}
		}

		return null;
	},

	_placeSources : function() {

		var i, len, color, border;

		for(i=0, len=this._sources.length; i<len; i++){

			source = this._sources[i];

			if(source.type == "amino"){
				color = "rgba(200, 100, 100, 0.5)";
				border = "rgb(200, 50, 50)";
			}
			else if(source.type == "fat"){
				color = "rgba(100, 200, 250, 0.5)";
				border = "rgb(100, 200, 250)";
			}
			else if(source.type == "sugar"){
				color = "rgba(200, 200, 200, 0.5)";
				border = "rgb(200, 200, 200)";
			}
			else if(source.type == "light"){
				color = "rgba(250, 250, 100, 0.5)";
				border = "rgb(250, 250, 100)";
			}

			if(source !== null){
				if(source.type != "light"){
					source.r = Math.sqrt(source.amount)*2.5;
				}

				source.$ = $("<div>").addClass("source-container").append($("<div>").addClass("source"));
				source.$.find(".source").css({
					width: source.r*2,
					height: source.r*2,
					"border-radius": source.r,
					"background-color": color,
					"border-color": border
				});
				source.$.css({
					left: source.x-source.r,
					top: source.y-source.r
				});

				source.$.appendTo($("#world"));
			}
		}

		this._sourceID = this._sources.length;
	},

	_placeCells : function(number) {

		var wHeight = $("#world").height();
		var wWidth = $("#world").width();

		for(var i=0; i<number; i++){

			var cell = this._createCell();
			this._setPosition(cell, wWidth, wHeight);

			cell.$.css({"left": cell.x, "top": cell.y, "transform": "rotate("+cell.direction+"deg)"});
			cell.$.find(".cell").css({
				"width": cell.size.x,
				"height": cell.size.y,
				"border-color": cell.style.color,
				"border-radius": cell.style.radius
				});
			cell.$.appendTo("#world");
		}
	},

	_bindClick : function() {

		var simContext = this;

		$(".container").click(function(index, elem) {

			$("#world .container").removeClass("selected");
			$(this).addClass("selected");

			var id = $(this).data("id");
			var cell = simContext._cells[simContext._indexOf(simContext._cells, "id", id)];

			simContext._windowItem = {id: id, cell: cell, type: "cell"};
		});
	},

	_updateWindow : function(cell, id, type) {

		var line = function(key, val) {

			var line = $("<div>").addClass("line")
				.append($("<div>").addClass("key").text(key))
				.append($("<div>").addClass("val").text(val));

			return line;
		};

		var title = function(title) {

			var title = $("<div>").addClass("title").text(title);

			return title;
		};

		var listMechanisms = function(cell) {

			var div = $("<div>");
			div.append($("<div>").addClass("sub-title").text("Mechanisms"));
			var mechanism = [];

			for(var i = 0, len = cell.mechanisms.length; i < len; i++){

				mechanism[i] = $("<div>").addClass("mechanism");
				mechanism[i].append($("<div>").addClass("mechanism-title").text(cell.mechanisms[i].name));

				$.each(cell.mechanisms[i], function(key, val) {

					if(key != "name"){

						mechanism[i].append(line(key, val));
					}
				});

				div.append(mechanism[i]);
			}

			return div;
		};

		if(type == "cell"){

			$("#window").empty()
				.append(title("Properties"))
				.append(line("ID", id))
				.append(line("Size", Math.round(cell.size.x)+"x"+Math.round(cell.size.y)+" : "+cell.size.ratio.toFixed(1)))
				.append(line("Energy", cell.energy.toFixed(1)))
				.append(line("Sugar", cell.stock.sugar.toFixed(1)))
				.append(line("Fat", cell.stock.fat.toFixed(1)))
				.append(line("Amino", cell.stock.amino.toFixed(1)))
				.append(line("Body", cell.body.toFixed(1)))
				.append(line("Direction", cell.direction))
				.append(listMechanisms(cell));
		}
	},

	_createCell : function() {

		var obj = $("<div>").addClass("container").append($("<div>").addClass("cell"));

		var cell = {
			$ : obj,
			x : 0,
			y : 0,
			size: {
				x: 5,
				y: 5,
				ratio: null		//x/y ratio for the cell
			},
			energy : 1000,
			alive : true,
			body: 20,
			direction: 0,
			moving: false,
			feeding: false,
			targetSource : null,
			stream : {
				speed: 0,
				direction: 0
			},
			stock: {
				sugar: 0,
				fat: 0,
				amino: 0
			},
			target : {
				x : null,
				y : null
			},
			absorption: true,	//ability
			style: {
				color : null,
				radius : null
			},
			view : {},
			modules : [],
			mechanisms : []
		};

		cell.size.ratio = Math.random()*9+1;

		cell.style = this._setStyle();

		this._addMechanism(cell);
		this._cells.push(cell);

		cell.$.data("id", this._cellID);
		cell.id = this._cellID;

		this._cellID++;

		return cell;
	},

	_createSource : function() {

		var source = {}, wWidth, wHeight, type, rnd, color, border;

		wWidth = $("#world").width();
		wHeight = $("#world").height();
		rnd = Math.random();

		if(rnd < 0.35){
			type  = "amino";
		}
		else if(rnd < 0.65){
			type = "fat";
		}
		else if(rnd < 0.95){
			type = "sugar";
		}else if(rnd < 1){
			type = "light";
		}

		source.type = type;

		if(source.type == "amino"){
			color = "rgba(200, 100, 100, 0.5)";
			border = "rgb(200, 50, 50)";
		}
		else if(source.type == "fat"){
			color = "rgba(100, 200, 250, 0.5)";
			border = "rgb(100, 200, 250)";
		}
		else if(source.type == "sugar"){
			color = "rgba(200, 200, 200, 0.5)";
			border = "rgb(200, 200, 200)";
		}
		else if(source.type == "light"){
			color = "rgba(250, 250, 100, 0.5)";
			border = "rgb(250, 250, 100)";
		}

		if(type == "light"){
			source.amount = Math.floor(Math.random()*2000+1000);
		}
		else{
			source.amount = Math.floor(Math.random()*150);
		}

		source.x = Math.floor(Math.random()*wWidth);
		source.y = Math.floor(Math.random()*wHeight);
		source.r = Math.floor(Math.random()*45+5);

		if(source.type != "light"){
			source.r = Math.sqrt(source.amount)*2.5;
		}

		source.$ = $("<div>").addClass("source-container").append($("<div>").addClass("source"));
		source.$.find(".source").css({
			width: source.r*2,
			height: source.r*2,
			"border-radius": source.r,
			"background-color": color,
			"border-color": border
		});
		source.$.css({
			left: source.x-source.r,
			top: source.y-source.r
		});

		source.$.appendTo($("#world"));

		source.id = this._sourceID;
		this._sourceID++;
		this._sources.push(source);
	},

	_addMechanism : function(cell) {

		var mechanisms = [
			{name: "Sugar", eff: 0.1, rate: 0.1},
			{name: "Fat", eff: 0.1, rate: 0.1},
			{name: "Light", eff: 0.1, rate: 0.1},
			{name: "Amino", eff: 0.1, rate: 0.1},
			{name: "SugarPerception", probability: 0.01},
			{name: "FatPerception", probability: 0.01},
			{name: "LightPerception", probability: 0.01},
			{name: "AminoPerception", probability: 0.01},
			{name: "Move", eff: 0.1, speed: 100},
			{name: "Absorption", speed: 1},
		];

		var len = mechanisms.length;

		for(var i=0; i<len; i++){
/***********************************************************/
			if(Math.random() < 0.7){
				cell.mechanisms.push(mechanisms[i]);
			}
/***********************************************************/
		}
	},

	_setStyle : function() {

		var r = 0, g = 0, b = 0, rStr, gStr, bStr, color, style = {};

		while(r+g+b < 15){
			r = Math.floor(Math.random()*16);
			g = Math.floor(Math.random()*16);
			b = Math.floor(Math.random()*16);

			rStr = r.toString(16);
			gStr = g.toString(16);
			bStr = b.toString(16);

			color = "#"+rStr+""+gStr+""+bStr;
		}

		style.color = color;
		style.radius = Math.floor(Math.random()*20+3);

		return style;
	},

	_setPosition: function(cell, xMax, yMax) {

		cell.x = Math.floor(Math.random()*xMax);
		cell.y = Math.floor(Math.random()*yMax);
		cell.direction = Math.floor(Math.random()*360);
	},

	_cells : [],

	_sources : [
		{id: 0, x: 500, y: 250, r: 50, amount: 250, type: "amino"}
		],

	_framePeriod : 30,

	_windowItem : {},

	_energy: {sugar: 100, fat: 200, amino: 50, light: 200},

	_cellID : 0,

	_sourceID : 0
};

/****************************/

sim.init({frameP: 15, cellNum: 20});

});
