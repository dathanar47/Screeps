// Actualizador

//Crear módulo llamado 'actualizador'

var Actualizador = {

    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('Recojer');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('Mejorar');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var recursos = creep.room.find(FIND_SOURCES);
            if(creep.harvest(recursos[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(recursos[0]);
            }
        }
	}
};

module.exports = Actualizador;