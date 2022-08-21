
export function hasObservations(experiment) {
    if (experiment.conditions.length > 0) {
        experiment.condition.forEach((condition) => {
            if (condition.units.length > 0) {
                condition.units.forEach((unit) => {
                    if (unit.observations.length > 0) {
                        return true
                    }
                })
            }
        })
    }
    return false
}

export function hasDetails(experiment) {
    return experiment.title &&
        experiment.title.length > 0 &&
        experiment.description &&
        experiment.description.length > 0 &&
        experiment.start_date &&
        experiment.end_date &&
        experiment.code &&
        experiment.code.length > 0;

}

export function hasTreatmentVariables(experiment) {
    return experiment.treatment_variables.length > 0;

}

export function hasResponseVariables(experiment) {
    return experiment.response_variables.length > 0;
}

export function hasActiveConditions(experiment) {
    return experiment.conditions.filter(condition => condition.status === 'active').length > 1;
}

export function hasParticipants(experiment) {
    return experiment.participants.length > 0;
}

// Checks that units have been configured for every active condition
export function hasUnits(experiment) {
    return experiment.conditions.filter(c => (c.status === 'active')).length > 0 &&
        experiment.conditions.filter(condition => (
            condition.status === 'active' &&
            condition.units.length === 0)).length === 0;
}

export function isProjectOwner(project) {
    if (project) {
        return parseInt(localStorage.getItem("school_id")) === project.owner_id
    }
    return false
}
