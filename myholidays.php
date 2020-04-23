<?php
/*
Plugin Name: myholidays
Description: Plugin for creating a gutenberg block
Author: luciadeveloper
Author URI: luciadeveloper.com
Version: 0.0.0
*/



function setupBack(){ 
	 
	wp_enqueue_script(
		'holidays',
		plugin_dir_url(__FILE__) . '/js/holidays.js',
		array('wp-blocks', 'wp-i18n', 'wp-editor'),
		true
	);

	wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', 
		array(), null, false
	);
	
	wp_enqueue_style(
		'editor', 
		plugins_url( 'css/editor.css', __FILE__ ), // css interno para el editor.
		array(),
		'4.7.0'
	);

}

add_action('enqueue_block_editor_assets', 'setupBack');


function setupFront() {

	wp_enqueue_style(
		'front-css', 
		plugins_url( 'css/front.css', __FILE__ ), 
		array(),
		'1.0.0'
	);

	wp_enqueue_script(
		'jquery',
		plugin_dir_url(__FILE__) . 'js/jquery.js',
		array(),
		true
	);

}    

add_action('init', 'setupFront');




