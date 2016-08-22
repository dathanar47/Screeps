// Recolector

//Crear módulo llamado 'recolector'

var Recolector = {

    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var recursos = creep.room.find(FIND_SOURCES);
            if(creep.harvest(recursos[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(recursos[0]);
            }
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
	}
};

module.exports = Recolector;