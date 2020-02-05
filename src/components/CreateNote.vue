<template>
	<section class="note">
		<h1 class="note__heading">Создание новой заметки</h1>
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
						:class="{'btn--disabled' : !canCreateNote}"
						@click="createNote()"
					>Создать заметку</button>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	import mixins from '../mixins'
	export default {
		mixins : [mixins],
		data(){
			return {}
		},
		methods : {
			createNote(){
				let all_notes = this.getNotes();
				this.note.todos = this.getFilteredTodos(this.note.todos);
				all_notes.unshift(this.note);
				this.saveNotes(all_notes);

				this.$router.push('/');
			}
		},
		computed : {
			canCreateNote(){
				if (this.note.title.trim()) {
					return true;
				}
			}
		},
		created(){}
	}
</script>

<style>
</style>