import Vue from 'vue'
import {eventEmitter} from './main'

export default Vue.mixin({
	data(){
		return {
			note : {
				title : '',
				todos : [],
			},
		}
	},
	methods : {
		addListItem(){
			this.note.todos.push({
				title : '',
				done : false
			});
		},
		removeListItem(index){
			this.note.todos.splice(index, 1);
		},
		toRemove(id){
			eventEmitter.$emit('toRemove', id);
		},
		removeNote(noteIndex){
			let all_notes = this.getNotes()
			all_notes.splice(noteIndex, 1)
			this.saveNotes(all_notes)
		},
		goHome(){
			if (this.$router.currentRoute.path != '/') {
				this.$router.push('/');
			}
		},

		getNotes(){
			if (localStorage.getItem('notes')) {
				return JSON.parse(localStorage.getItem('notes'))
			}
			return []
		},
		saveNotes(notes){
			if (notes) {
				localStorage.setItem('notes', JSON.stringify(notes));
			}
		},
		getFilteredTodos(todos){
			return (todos || []).filter((todo)=>{
				return todo.title.trim();
			})
		},
	},
	computed : {
		canAddListItem(){
			if (!this.note.todos.length) {
				return true;
			}
			if (this.note.todos[this.note.todos.length - 1].title.trim()) {
				return true;
			}
			return false;
		},
	},
})