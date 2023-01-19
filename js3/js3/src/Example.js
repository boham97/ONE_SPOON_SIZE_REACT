import * as THREE from '../node_modules/three/build/three.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

function Example() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x004fff);
  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 10000)
    camera.position.z = 15
    

    const textureLoader = new THREE.TextureLoader();
    
    const textureBaseColor = textureLoader.load('3d/tree027/Wood_027_basecolor.jpg')
    const textureNormal = textureLoader.load('3d/tree027/Wood_027_Normal.jpg')
    const textureHeight = textureLoader.load('3d/tree027/Wood_027_Height.jpg')
    const textureRoughness = textureLoader.load('3d/tree027/Wood_027_Roughness.jpg')
    const heart = textureLoader.load('3d/tree027/heart2.png')
    

    const loader = new GLTFLoader();
    loader.load( '3d/curlDice.gltf',
        gltf => {
            //gltf.scene.scale(3,3,3)
            var model = gltf.scene;
            console.log(model)
            model.traverse ( ( o ) => {
                if ( o.isMesh ) {
                    //note: for a multi-material mesh, `o.material` may be an array,
                    // in which case you'd need to set `.map` on each value.
                    // 텍스쳐 요소들 넣기
                    o.material.map = textureBaseColor;
                    o.material.normalmap = textureNormal;
                    o.material.displacementMap = textureHeight
                    o.material.displacemenScale = 0.5
                    o.material.roughnessMap = textureRoughness
                    o.material.roughness = 0.5
                    

                }
            });
        model.scale.x = 8   //x축으로 8배 확대
        model.scale.y = 8   //y축으로 8배 확대
        model.scale.z = 8   //z축으로 8배 확대

        model.rotation.x = 90 //회전
        scene.add( model );
        function animate2() {
            // 시간에 따라 회전함

            //gltf.scene.rotation.x += 0.1
            //gltf.scene.rotation.z += 0.1
            gltf.scene.rotation.y += 0.1

            requestAnimationFrame(animate2)
        }
        animate2()
    });

    const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);   //정육면체
    const mat = new THREE.MeshStandardMaterial({
        //texture요소 입력
        map : textureBaseColor,
        normalMap : textureNormal,
        displacementMap : textureHeight,
        displacementScale : 1,
        roughnessMap : textureRoughness,
        roughness : 1
    })
    const cube = new THREE.Mesh(geo, mat)   //오브젝트 생성
    cube.position.x = 1                     // 생성 위치
    scene.add(cube)                         //scene에 추가하고 camera에 보여야 렌더링됨

    const geo2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const mat2 = new THREE.MeshStandardMaterial({
        map : textureBaseColor
        // texture로 map요소만 넣어서 cube와 다르게 광이나 질감이 없음
    })
    const cube2 = new THREE.Mesh(geo2, mat2)
    cube2.position.x = -1
    scene.add(cube2)
    




    //heart
    const shape = new THREE.Shape();

    const x = 2.5, y= 0;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    // ShapeGeometry의 생성자에 인자로 shape 객체를 전달함
    const geometry = new THREE.ShapeGeometry(shape);

    // 회색 색상의 재질로 mesh 타입 오브젝트 생성
    
    heart.repeat.set(0.1, 0.1)

    const fillMaterial = new THREE.MeshPhongMaterial({ map: heart});
    const cube4 = new THREE.Mesh(geometry, fillMaterial);

    // 노란색 선 재질 생성
    const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
    // 앞에서 만든 geometry를 이용해 line타입 오브젝트 생성
    /* 
    WireframeGeometry 클래스: 와이어프레임 형태로 지오메트리 표현
    만약 WireframeGeometry 적용하지 않고 생성하면 모델의 모든 외곽선이 표시되지 않음.
    */
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), lineMaterial);
    
    // mesh 오브젝트와 line 오브젝트를 하나의 오브젝트로 다루기 위해 그룹으로 묶음
    const group = new THREE.Group()
    /*
    cube를 삭제하면 노란색 line만 보임,
    line을 삭제하면 회색 cube만 보임
    */
    group.add(cube4);
    //group.add(line);
    
    // 그룹 객체를 scene에 추가
    scene.add(group);




    //light
    const Light1 = new THREE.DirectionalLight(0xffffff, 0.5)    //백색광, 세기: 0.5
    Light1.position.set(1, 1, 1)    //ㅇ위치
    scene.add(Light1)


    //light2
    const dl = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(dl)

    //renderer 렌더링
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);
    
    // cube, cube2가 회전하고 이를 리렌더링함
    function render(time) {
        time *= 0.001
        cube.rotation.x = time
        cube.rotation.y = time

        cube2.rotation.x = time
        cube2.rotation.y = time
        
      renderer.render(scene, camera)

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
    
    //반응형 window의 비율이 바뀌면 update
    function onWindow(){
        camera.aspect = window.innerWidth/ window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindow)
}

export default Example