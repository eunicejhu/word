import {dispatch} from "../dispatcher";

function addWord(word) {
	dispatch({
		word: word,
		type: "word:addWord"
	});
}

function editWord(word) {
	dispatch({
		word: word,
		type: "word:editWord"
	})
}

function deleteWord(word) {
	dispatch({
		word: word,
		type: "word:deleteWord"
	});
}

export {addWord, editWord, deleteWord};