function buildGUI(){
    var gui = new dat.GUI({autoPlace: false});
    
    var objectsMenu = gui.addFolder('Objects: ');
    
    initCameraScroll(objectsMenu, camera);
    
    var object1 = objectsMenu.addFolder('Porche 911 GT2');
    var position1 = object1.addFolder('Position');
    var object2 = objectsMenu.addFolder('AC Cobra 269');
    var position2 = object2.addFolder('Position');
    
    initCarPosition(-4, position1, mesh1, 'x');
    initCarPosition(0, position1, mesh1, 'y');
    initCarPosition(0, position1, mesh1, 'z');
    initCarPosition(4, position2, mesh2, 'x');
    initCarPosition(-1, position2, mesh2, 'y');
    initCarPosition(0, position2, mesh2, 'z');
    
    isVisible(object1, mesh1);
    addColor(object1, mesh1);
    addTransparency(object1, mesh1);
    addMaterial(object1, mesh1);
    
    isVisible(object2, mesh2);
    addColor(object2, mesh2);
    addTransparency(object2, mesh2);
    addMaterial(object2, mesh2);
    
    initButtons(objectsMenu);
    
    objectsMenu.open();
    
    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(gui.domElement);
}

function initCarPosition(value, position, mesh, axis){
     var CarPosition = function(){
        this[axis] = value;
    }
    
    var carPosition = new CarPosition();
    position.add(carPosition, axis).name('Position ' + axis + ': ').min(-10).max(10).step(0.5).onChange(function(value){
        mesh.position[axis] = value;
    });
}

function isVisible(object, mesh){
    object.add(mesh, 'visible').name('Visible:').onChange(function(value){
        visibility = true;
    });
}

function addColor(object, mesh){
    var Config = function(){
        this.color = "#ffffff";
    }
    var conf = new Config();
    object.addColor(conf, 'color').name('Color').onChange(function(value){
        value = value.replace('#', '0x');
        for (var i = 0; i < mesh.children.length; i++){
            mesh.children[i].material.color.setHex(value);
        }    
    });
}

function addTransparency(object, mesh){
    var Transparency = function(){
        this.transp = 1;
    }
    var transparency = new Transparency();
    object.add(transparency, 'transp').name('Transparency: ').min(0).max(1).step(0.01).onChange(function(value){
        for (var i = 0; i < mesh.children.length; i++){
            mesh.children[i].material.opacity = value;
        }
    });
}

function addMaterial(object, mesh){
    var ObjectMaterial = function(){
        this.material = "Flat";
    }
    var objectMaterial = new ObjectMaterial();
    object.add(objectMaterial, 'material', ["Wireframe", "Flat", "Gouraud" ,"Phong"]).name('Material type:').onChange(function(value){
        for (var i = 0; i < mesh.children.length; i++){
            var color = mesh.children[i].material.color;
            var transp = mesh.children[i].material.opacity;
            switch (value){
                case 'Wireframe':
                    newMaterial = new THREE.MeshBasicMaterial({
                        wireframe: true
                    });
                    break;
                case 'Flat':
                    newMaterial = new THREE.MeshPhongMaterial({
                        shading: THREE.FlatShading
                    });
                    break;
                case 'Gouraud':
                    newMaterial = new THREE.MeshLambertMaterial({
                        shading: THREE.SmoothShading
                    });
                    break;
                default: 
                    newMaterial = new THREE.MeshPhongMaterial({
                        shading: THREE.SmoothShading
                    });
            }
            newMaterial['color'] = color;
            newMaterial['transparent'] = true;
            newMaterial['opacity'] = transp;
            mesh.children[i].material = newMaterial;
        }
    });
}

function initCameraScroll(objectsMenu, camera){
    var CameraZ = function(){
        this.z = 10;
    }
    var cameraZ = new CameraZ();
    objectsMenu.add(cameraZ, 'z').name('Camera z: ').min(0).max(50).step(1).onChange(function(value){
        camera.position.z = value;
    });
}

function initButtons(objectsMenu){
    var Button = function(){
        this.buttonFunction = function(){
            alert("Kamil Basta");
        }     
    }
    objectsMenu.add(new Button(), "buttonFunction").name("Author");
    
    var Button = function(){
        this.buttonFunction = function(){
            alert("Credits to free3d.com");
        }     
    }
    objectsMenu.add(new Button(), "buttonFunction").name("Credits");
}