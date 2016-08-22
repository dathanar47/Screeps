// Main

/*
Recolector = encargados de recojer energía y guardarla.
Actualizador = encargados de mejorar el RCL.
Arquitecto = encargados de construir los edificios.

Temen-ni-gru = Spawn.
*/

var Recolector = require('recolector');
var Actualizador = require('actualizador');
var Arquitecto = require('arquitecto');

module.exports.loop = function () {
	
	for (var name in Memory.creeps) {
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory', name);
        }
    }
	
	var est = _.filter(Game.spawns);
    console.log('est: ' + est.length);
	if (est.length < 6){
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 18, 20, STRUCTURE_CONTAINER);
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 18, 21, STRUCTURE_CONTAINER);
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 18, 22, STRUCTURE_CONTAINER);
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 18, 23, STRUCTURE_CONTAINER);
        Game.spawns['Temen-ni-gru'].room.createConstructionSite( 18, 24, STRUCTURE_CONTAINER);
    }
	
	var est2 = _.filter(Game.spawns);
    console.log('est2: ' + est2.length);
	if (est2.length < 6){
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 20, 27, STRUCTURE_EXTENSION);
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 21, 27, STRUCTURE_EXTENSION);
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 22, 27, STRUCTURE_EXTENSION);
		Game.spawns['Temen-ni-gru'].room.createConstructionSite( 23, 27, STRUCTURE_EXTENSION);
        Game.spawns['Temen-ni-gru'].room.createConstructionSite( 24, 27, STRUCTURE_EXTENSION);
    }
	
    
    var recolectores = _.filter(Game.creeps, (creep) => creep.memory.role == 'recolector');
    console.log('recolectore: ' + recolectores.length);
    if (recolectores.length < 1){
        var newName = Game.spawns['Temen-ni-gru'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'recolector'});
        console.log('Creando nuevos recolectores ' + newName);
    }
	var arquitectos = _.filter(Game.creeps, (creep) => creep.memory.role == 'arquitecto');
    console.log('arquitecto: ' + arquitectos.length);
    if (recolectores.length == 1 && arquitectos.length < 5){
        var newName = Game.spawns['Temen-ni-gru'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'arquitecto'});
        console.log('Creando nuevos arquitectos ' + newName);
    }
    var actualizadores = _.filter(Game.creeps, (creep) => creep.memory.role == 'actualizador');
    console.log('actualizadore: ' + actualizadores.length);
    if (recolectores.length == 1 && actualizadores.length < 1){
        var newName = Game.spawns['Temen-ni-gru'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'actualizador'});
        console.log('Creando nuevos actualizadores ' + newName);
    }
    
    
    for(var name in Game.creeps){
        var creep = Game.creeps[name]
        if(creep.memory.role == 'recolector'){
            Recolector.run(creep);
        }
        if(creep.memory.role == 'actualizador'){
            Actualizador.run(creep);
        }
        if(creep.memory.role == 'arquitecto'){
            Arquitecto.run(creep);
        }
    }
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
}