(() => {
    let yOffset = 0; // window.pageYOffset 대신 사용할 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)의 index

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
				messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: { // values: 어느시점에 등장하고 사라지게 할지 정의하기 위함
                messageA_opacity: [0, 1] // [시작 값, 끝 값]
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5, // 브라우저 높이의 5배로
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; // 브라우저 높이의 5배한 값만큼 scrollHeight를 지정
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 실제 scroll-section의 높이에 적용시켜준다.
        }

        // currentScene 자동 세팅
        // 현재 위치에서 새로고침
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset) {
        // currentYOffset: 현재 씬에서 얼마나 스크롤 되었는지
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        rv = scrollRatio * (values[1] - values[0]) + values[0];

        return rv;
    }

    function scrollLoop() {
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight; // 이전 구간의 전체 scroll height
		}

        // yOffset(현재 스크롤의 위치)가 prevScrollHeight + sceneInfo[currentScene](현재 보고있는 위치)보다 클 경우 currentScene + 1을 해서 scene을 바꿔준다.
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        
        // yOffset(현재 스크롤의 위치)가 prevScrollHeight보다 작을 경우 currentScene - 1을 해서 scene을 바꿔준다.
        if (yOffset < prevScrollHeight) {
            if (prevScrollHeight === 0) return; // 사파리와 같은 브라우저의 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        function playAnimation() { // 애니메이션이 진행되는 함수
            const objs = sceneInfo[currentScene].objs;
            const values = sceneInfo[currentScene].values;
            let currentYOffset = yOffset - prevScrollHeight; // 현재 스크롤 위치 - 이전 스크롤 높이

            switch (currentScene) {
                case 0:
                    // console.log('0 play');
                    let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset); // 0 ~ 1 사이의 값
                    objs.messageA.style.opacity = messageA_opacity_in;

                    break;
                case 1:
                    // console.log('1 play');
                    break;
                case 2:
                    // console.log('2 play');
                    break;
                case 3:
                    // console.log('3 play');
                    break;
            }
        }

        playAnimation();
    }

    
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    
    // window.addEventListener('DOMContentLoaded', setLayout); // DOM 구조가 로드가 끝나면 실행 -> 실행 시점이 더 빨라서 더 많이 사용한다.
    window.addEventListener('load', setLayout); // 웹 페이지에 있는 리소스가 싹 다 로드되면 실행
    window.addEventListener('resize', setLayout);
})();