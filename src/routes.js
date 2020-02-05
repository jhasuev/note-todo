import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from './components/Home'
import NotesList from './components/NotesList.vue'
import CreateNote from './components/CreateNote.vue'
import EditNote from './components/EditNote.vue'

Vue.use(VueRouter)

export default new VueRouter({
	routes : [
		{
			path : '/',
			component : NotesList,
		},
		{
			path : '/create',
			component : CreateNote,
		},
		{
			path : '/edit/:id',
			component : EditNote,
			props : true,
		},
	],
	// mode : 'history'
});