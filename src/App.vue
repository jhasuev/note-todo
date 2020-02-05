<template>
	<div class="container">
		<div class="navbar">
			<router-link
				tag="button"
				class="navbar-item"
				v-for="page in pages"
				:to="page.url"
				active-class="active"
				exact
			>{{page.title}}</router-link>
		</div>
		<router-view></router-view>

		<remove-confirm-popup></remove-confirm-popup>
		<go-back-confirm-popup></go-back-confirm-popup>
	</div>
</template>

<script>
	import RemoveConfirmPopup from './components/RemoveConfirmPopup.vue'
	import GoBackConfirmPopup from './components/GoBackConfirmPopup.vue'
	export default {
		data(){
			return {
				pages : [
					{
						url : '/',
						title : 'Все заметки',
					},
					{
						url : '/create',
						title : 'Создать заметку',
					},
				],
			}
		},
		components: {
			RemoveConfirmPopup,
			GoBackConfirmPopup,
		}
	}
</script>

<style>

.navbar {
	padding: 15px 0;
	border-bottom: 1px solid #bbb;
	text-align: right;
}
.navbar-item {
	margin-left: 20px;
	font-size: 14px;

	outline: 0;
	display: inline-block;
	position: relative;
	transition: .2s;
	border: none;
	opacity: .5;
}
.navbar-item.active {
	opacity: 1;
	color: #069;
	text-decoration: underline;
}

</style>
