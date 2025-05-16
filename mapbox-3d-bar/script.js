// ��ʼ����Ѷ��ͼ
const center = new TMap.LatLng(39.9042, 116.4074); // ����

const map = new TMap.Map("container", {
  center: center,
  zoom: 13,
  pitch: 60,
  rotation: 0,
  viewMode: "3D"
});

// ��ʼ�� Three.js ����
const canvas = document.getElementById("three-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 1000);

// ��������
const geometry = new THREE.BoxGeometry(50, 50, 300);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const bar = new THREE.Mesh(geometry, material);
scene.add(bar);

// ��γ��ת��Ļ����
function updateBarPosition() {
  const point = map.getProjection().fromLatLngToPoint(center);
  bar.position.set(point.x * 100 - 5000, -point.y * 100 + 3000, 0);
}

updateBarPosition();
renderer.render(scene, camera);

// ��ͼ�¼�ͬ��
map.on("bounds_changed", () => {
  updateBarPosition();
  renderer.render(scene, camera);
});
