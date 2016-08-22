// Arquitecto

//Crear módulo llamado 'arquitecto'

var Arquitecto = {

    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('Recojer');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('Crear');
	    }
	    else {
            var objetivos = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(objetivos.length > 0) {
                if(creep.transfer(objetivos[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(objetivos[0]);
                }
            }
        }

	    if(creep.memory.building) {
	        var objetivos = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(objetivos.length) {
                if(creep.build(objetivos[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(objetivos[0]);
                }
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

module.exports = Arquitecto;