import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const user = writable(browser ? localStorage.getItem('user') : null);
export const token = writable(browser ? localStorage.getItem('token') : '');

const storedNavOpen = browser ? localStorage.getItem('navOpen') : false;
export const navOpen = writable(storedNavOpen === 'true');
