// Variables voor de setup

let container;
let camera;
let renderer; 
let scene; 
let world;


    container = document.querySelector('.scene') 

    // Scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    // Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-0.1, 0, 50);

    // Color
    const ambient = new THREE.AmbientLight(0x000000, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0x03befc, 1);
    const light2 = new THREE.DirectionalLight(0x03befc, 1);
    light.position.set(3,0,-1.65)
    light2.position.set(-1.5,1,-1.65)
    scene.add(light);
    scene.add(light2);


    // Render
    renderer = new THREE.WebGLRenderer({ antialias: true }); 
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
    
    container.appendChild(renderer.domElement);
    // Load Model
    let loader = new THREE.GLTFLoader();
    
   
    let mouse = { x: 0, y: 0};
    let target = { x: 0, y: 0 }


    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function onDocumentMouseMove(event) {
        mouse.x = (event.clientX - windowHalfX)
        mouse.y = (event.clientY - windowHalfY)
    }

    document.addEventListener('mousemove', onDocumentMouseMove)

    const clock = new THREE.Clock()

    const tick = () => {

        target.x = mouse.x * .001
        target.y = mouse.y * .001

        const elapsedTime = clock.getElapsedTime()

        // 
        world.rotation.y += .5 * (target.x - world.rotation.y)
        world.rotation.x += .5 * (target.y - world.rotation.x)
        world.rotation.z = .5 * elapsedTime
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick)
    }
    loader.load('./3d/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        world = gltf.scene.children[0];
        tick()
    });
    
    

    



