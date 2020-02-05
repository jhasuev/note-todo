<template>
	<section class="note">
		<h1 class="note__heading">Редактирование заметки</h1>
		<ul class="note__cards">
			<li class="note__cards-item">
				<h2 class="note__cards-caption">
					<input class="bordered" type="text" v-model="note.title" placeholder="Название заметки">
				</h2>
				<div class="note__cards-todo">
					<ul class="note__cards-todo-list">
						<li class="note__cards-todo-item"
							v-for="(todo, index) in note.todos"
						>
							<label class="note__cards-todo-done">
								<input type="checkbox" class="note__cards-todo-done-input" v-model="todo.done">
								<i class="note__cards-todo-done-icon"></i>
							</label>
							<div class="note__cards-todo-text">
								<input class="bordered  bordered--move-top" type="text" placeholder="Название задачи"
									v-model="todo.title"
								>
							</div>
							<button class="note__cards-todo-remove  btn  btn--danger"
								@click="removeListItem(index)"
							>&times;</button>
						</li>
					</ul>

					<div class="note__cards-todo-actions">
						<button
							class="note__cards-todo-actions-item  btn  btn--primary"
							:class="{'btn--disabled' : !canAddListItem}"
							@click="addListItem()"
						>Добавить еще один пункт</button>
					</div>
				</div>
				<div class="note__cards-actions">
					<button class="note__cards-actions-item  btn  btn--primary"
						:class="{'btn--disabled' : !isNoteChanged}"
						@click="saveNote()"
					>Сохранить изменения</button>

					<button class="note__cards-actions-item  btn  btn--danger"
						@click="toRemove(id)"
					>Удалить</button>
					
				</div>
				<div class="note__cards-actions">

					<!-- (необходимо подтверждение) -->
					<a class="note__cards-actions-item  link"
						@click="getReadyBack()"
					>Венуться</a> 

					<a class="note__cards-actions-item  link"
						@click="getOriginals()"
						v-if="isNoteChanged"
					>Отменить внесенное изменение</a>
					
					<a class="note__cards-actions-item  link"
						@click="getEditions()"
						v-if="editted_note && !isNoteChanged"
					>Повторить отмененное изменение</a>

				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	import mixins from '../mixins'
	import {eventEmitter} from '../main'
	export default {
		props: ['id'],
		mixins : [mixins],
		data(){
			return {
				original_note : null,
				editted_note : null,
			}
		},
		methods : {
			saveNote(){
				let all_notes = this.getNotes();

				this.note.todos = this.getFilteredTodos(this.note.todos);

				all_notes[this.id] = this.note;
				this.saveNotes(all_notes);

				this.original_note = JSON.parse(JSON.stringify(this.note));
				this.editted_note = null;
			},
			getReadyBack(){
				eventEmitter.$emit('getReadyBack');
			},
			getOriginals(){
				this.editted_note = JSON.parse(JSON.stringify(this.note));
				this.note = JSON.parse(JSON.stringify(this.original_note));
			},
			getEditions(){
				this.note = JSON.parse(JSON.stringify(this.editted_note));
				this.editted_note = null;
			},
		},
		computed : {
			isNoteChanged(){
				if (this.note.title.trim()) {
					if (JSON.stringify(this.note) != JSON.stringify(this.original_note)) {
						return true;
					}
				}
			},
		},
		created(){
			if (this.id && this.id < this.getNotes().length) {
				this.note = this.getNotes()[this.id];
				this.original_note = JSON.parse(JSON.stringify(this.note));
				eventEmitter.$on('goBack', ()=>{
					this.goHome();
				});
			}
			else {
				this.$router.push('/');
			}
		},
	}
</script>

<style>
</style>