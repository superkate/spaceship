/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[]|Planet position Местоположение корабля
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
	this.name = name;
	this.position = position;
	this.capacity = capacity;
	
	if (position instanceof  Planet) {
		this.positionName = position.name;
		this.position = position.position;
	} else {
		this.positionName = null;
		this.position = position;
	}

	this.occupiedSpace = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. "Яндекс". Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. "Яндекс". Местоположение: 50,20. Занято: 200 из 1000т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
	var name_text = 'Грузовой корабль. "' + this.name + '".';
		position_text = 'Местоположение: ',
		capacity_text = '';
	

	position_text += (this.positionName != null) ?
		this.positionName + '.' :
		this.position[0] + ', ' + this.position[1] + '.';
	
	capacity_text = (this.occupiedSpace == 0) ? 
		'Товаров нет.' : 
		'Занято: ' + this.occupiedSpace + ' из ' + this.capacity + 'т.';
	
	console.log(name_text + ' ' + position_text + ' ' + capacity_text);
}

/**
 * Возвращает количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 * @returns {Number} Количество свободного места на корабле
 */
Vessel.prototype.getFreeSpace = function () {
	return this.capacity - this.occupiedSpace;
}

/**
 * Возвращает количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 * @returns {Number} Количество занятого места на корабле
 */
Vessel.prototype.getOccupiedSpace = function () {
	return this.occupiedSpace;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.flyTo
 */
Vessel.prototype.flyTo = function (newPosition) {
	if (newPosition instanceof  Planet) {
		this.positionName = newPosition.name;
		this.position = newPosition.position;
	} else {
		this.positionName = null;
		this.position = newPosition;	
	}
}

/**
 * Проверяте находится ли корабль в указанной точке
 * @param {Number}[] position Координаты точки
 * @name Vessel.isVesselInThisPosition
 * @returns {Boolean} True, если координаты корабля и точки position совпадают. False, если нет
 */
Vessel.prototype.isVesselInThisPosition = function (position) {
	return (this.position.toString() == position.toString());
}

/**
 * Загружает на корабль указанное количество груза. Возвращает количество груза, которое поместилось на корабль
 * @param {Number}[] cargoWeight Количество груза
 * @name Vessel.loadCargo
 * @returns {Number} Количество груза, которое поместилось на корабль
 */
Vessel.prototype.loadCargo = function (cargoWeight) {
	var free_space = this.getFreeSpace();
	
	if (free_space >= cargoWeight) {
		will_be_load = cargoWeight;
	} else {
		will_be_load = free_space;
		console.log('На корабле не хватает места для всего груза, будет загружено только доступное количество');
	}
		
	this.occupiedSpace += will_be_load;
	return will_be_load;
}

/**
 * Выгружает с корабля указанное количество груза. Возвращает количество груза, которое удалось выгрузить с корабля
 * @param {Number}[] cargoWeight Количество груза
 * @name Vessel.unLoadCargo
 * @returns {Number} Количество груза, которое было выгружено с корабля
 */
Vessel.prototype.unLoadCargo = function (cargoWeight) {
	var occupied_space = this.getOccupiedSpace();
	var will_be_unload;
	
	if (occupied_space >= cargoWeight) {
		will_be_unload = cargoWeight;
	} else {
		will_be_unload = occupied_space;
		console.log('На корабле нет такого количества груза, будет выгружено только доступное количество');
	}
		
	this.occupiedSpace -= will_be_unload;
	return will_be_unload;
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
	this.name = name;
	this.position = position;
	
	this.availableAmountOfCargo = (availableAmountOfCargo === undefined) ? 
		0 : 
		availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
	var name_text = 'Планета '+ this.name + '.';
		position_text = 'Местоположение: ' + this.position[0] + ', ' + this.position[1] + '.',
		availableAmountOfCargo_text = '';
	
	availableAmountOfCargo_text = (this.availableAmountOfCargo == 0) ? 
		'Грузов нет.' : 
		'Доступно груза: ' + this.availableAmountOfCargo + 'т.';
	
	console.log(name_text + ' ' + position_text + ' ' + availableAmountOfCargo_text);
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Planet.getAvailableAmountOfCargo
 * @returns {Number} Доступное количество груза планеты
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
	return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Planet.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
	if (vessel.isVesselInThisPosition(this.position)) {
		if (cargoWeight > this.availableAmountOfCargo) {
			cargoWeight = this.availableAmountOfCargo;
			console.log('На этой планете нет такого количества груза, на корабль будет загружено только доступное количество');
		}
		
		var loadedCargo = vessel.loadCargo(cargoWeight);
		this.availableAmountOfCargo -= loadedCargo;
		
		console.log('На корабль было загружено: ' + loadedCargo + 'т.');
	} else {
		console.log('Корабль не находится на планете');
	}
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Planet.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
	if (vessel.isVesselInThisPosition(this.position)) {
		var unLoadedCargo = vessel.unLoadCargo(cargoWeight);
		this.availableAmountOfCargo += unLoadedCargo;
		
		console.log('На планету было выгружено: ' + unLoadedCargo + 'т.');
	} else {
		console.log('Корабль не находится на планете');
	}
}