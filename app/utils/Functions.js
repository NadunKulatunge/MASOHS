export function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TaskStatusColor(str){
    if(str=='raised'){
        return '#00AEEF'
    }else if(str=='pending'){
        return '#FF9800';
    }else if(str=='completed'){
        return '#009688';
    }
}

export function TaskTitleColor(str){
    if(str=='complaints'){
        return '#00AEEF'
    }else if(str=='accidents'){
        return '#EB6444';
    }
}