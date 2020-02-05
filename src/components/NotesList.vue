<template>
	<section class="note">
		<h1 class="note__heading" v-if="notes.length">Все заметки</h1>
		<div v-else>
			<h1 class="note__heading  note__heading--pb-0">Заметок нет...</h1>
			<div class="text-center">
				<router-link tag="a" to="/create" class="link">Создать?</router-link>
			</div>
		</div>
		<ul class="note__cards">
			<li class="note__cards-item" v-for="(note, noteIndex) in notes">
				<h2 class="note__cards-caption">{{note.title}}</h2>
				<div class="note__cards-todo" v-if="note.todos.length">
					<ul class="note__cards-todo-list">
						<li class="note__cards-todo-item" v-for="(todo, todoIndex) in note.todos" v-if="todoIndex < todo_max_per_note">
							<div class="note__cards-todo-text  note__cards-todo-text--just-list">{{todo.title}}</div>
						</li>
					</ul>
				</div>
				<div class="note__cards-actions">
					<router-link :to="'/edit/' + noteIndex" class="note__cards-actions-item  btn  btn--primary">Изменить</router-link>
					<button @click="toRemove(noteIndex)" class="note__cards-actions-item  btn  btn--danger">Удалить</button>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	import mixins from '../mixins'
	import {eventEmitter} from '../main'
	export default {
		mixins : [mixins],
		data(){
			return {
				todo_max_per_note : 2,
				remove_id : null,
				notes : [],
			}
		},
		methods: {
			loadNotes(){
				this.notes = this.getNotes();
			},
		},
		created(){
			this.loadNotes();
			eventEmitter.$on('updateNotes', ()=>{
				this.loadNotes();
			});
		},
	}
</script>

<style>



</style>
