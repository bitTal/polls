import { SET_METADATA, REMOVE_METADATA } from './action-types';


export function setMetadata(metadata){
	return {
		type: SET_METADATA,
		metadata
	};
}

export function removeMetadata(){
	return {
		type: REMOVE_METADATA
	};
}


