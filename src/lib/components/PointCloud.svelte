<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	import { getData, getColorHex, getColorRGB } from '$lib/utils/importData';

	let sliderValue = 0;
	let data;

	let renderer;
	let scene;
	let camera;
	let controls;
	let spheres;

	// Function to update positions and colors of spheres based on slider value
	function updateSpheres() {
		const value = parseInt(sliderValue);
		let current_step_weights = data[value];

		spheres.forEach((sphere, index) => {
			sphere.position.x = current_step_weights[index].w1;
			sphere.position.y = current_step_weights[index].w2;
			sphere.position.z = current_step_weights[index].w3;
			let color = getColorHex(current_step_weights[index].fun);
			sphere.material.color.set(color);

			// renderer.render(scene, camera);
		});
	}

	function printPosition() {
		console.log(camera.position);
	}

	const init = async () => {
		const container = document.getElementById('container');

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		renderer.setClearColor(0xffffff);
		container.appendChild(renderer.domElement);

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			30,
			container.offsetWidth / container.offsetHeight,
			0.1,
			1000
		);
		// camera.position.set(0, 0, 2);
		// // camera.up.set(0.2, 0.2, 0.2); // Set the up vector to point towards the positive z-axis
		// camera.lookAt(0.2, 0.2, 0.2); // Look at the center

		// let rotation = new THREE.Euler(30, 45, 15, 'XYZ');
		// rotation = new THREE.Euler(0, 0, 0, 'XYZ');
		// console.log(rotation);
		// camera.rotation.setFromVector3(rotation);

		camera.position.set(1, 1, 1);
		camera.lookAt(0.2, 0.2, 0.2); // Look at the center
		camera.up.set(0, 0, 1);
		// let rotation = new THREE.Euler(0, 0, 0.1, 'XYZ');
		// camera.setRotationFromEuler(rotation);

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.rotateSpeed = 0.5;
		controls.zoomSpeed = 1.2;

		const geometry = new THREE.SphereGeometry(0.01, 16, 16);

		data = await getData('/data.csv');

		spheres = new Array();
		data[0].forEach((element) => {
			const material = new THREE.MeshBasicMaterial({ color: getColorHex(element.fun) });

			const sphere = new THREE.Mesh(geometry, material);
			sphere.position.set(element.w1, element.w2, element.w3);
			spheres.push(sphere);
			scene.add(sphere);
		});

		var axesHelper = new THREE.AxesHelper(5);
		scene.add(axesHelper);
	};

	onMount(() => {
		init();

		function animate() {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
			controls.update();
		}

		animate();
	});
</script>

<div class="flex flex-col h-full my-4 gap-4">
	<div class="border border-black h-full my-auto p-2">
		<div id="container" class="w-full h-[99%]"></div>
	</div>
	<div>
		<input
			class="w-full"
			type="range"
			bind:value={sliderValue}
			min="0"
			max="291"
			step="1"
			on:input={updateSpheres}
		/>
	</div>
</div>
