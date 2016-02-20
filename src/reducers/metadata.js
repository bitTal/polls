import { SET_METADATA, REMOVE_METADATA } from '../actions/metadata';

function setMetadata(state, metadata){
	return Object.assign({}, metadata);
}

function removeMetadata(){
	return {};
}

export default function metadataReducer(state = {}, action){
	switch (action.type){
		case SET_METADATA:
			return setMetadata(state, action.metadata);
		case REMOVE_METADATA:
			return removeMetadata();
		default:
			return state;
	}
}
