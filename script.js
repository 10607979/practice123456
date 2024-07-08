// 폼 제출 이벤트 처리
document.getElementById('habit-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 동작 방지

    // 입력값 가져오기
    const sleepHours = parseFloat(document.getElementById('sleep-hours').value);
    const exerciseFrequency = parseInt(document.getElementById('exercise-frequency').value);
    const waterIntake = parseInt(document.getElementById('water-intake').value);

    // 건강 점수 계산
    const healthScore = calculateHealthScore(sleepHours, exerciseFrequency, waterIntake);

    // 건강 점수와 예측 출력
    displayHealthResult(healthScore);
});

// 건강 점수 계산 함수
function calculateHealthScore(sleepHours, exerciseFrequency, waterIntake) {
    // 각 요소에 가중치 부여 (임의로 설정)
    const sleepWeight = 3;
    const exerciseWeight = 5;
    const waterWeight = 2;

    // 각 요소별 점수 계산
    const sleepScore = sleepHours >= 7 ? 100 : (sleepHours / 7) * 100;
    const exerciseScore = (exerciseFrequency / 7) * 100; // 주간 운동 빈도를 하루 기준으로 계산
    const waterScore = (waterIntake / 2000) * 100; // 하루 평균 물 섭취량을 2000ml 기준으로 계산

    // 전체 건강 점수 계산 (가중 평균)
    const healthScore = (sleepScore * sleepWeight + exerciseScore * exerciseWeight + waterScore * waterWeight) / (sleepWeight + exerciseWeight + waterWeight);

    return Math.round(healthScore); // 소수점 이하 반올림하여 정수 반환
}

// 건강 점수와 예측 출력 함수
function displayHealthResult(score) {
    const healthScoreElement = document.getElementById('health-score');
    const healthPredictionElement = document.getElementById('health-prediction');
    const recommendationElement = document.getElementById('recommendation');
    const resultContainer = document.getElementById('result-container');

    // 건강 점수 표시
    healthScoreElement.textContent = score;

    // 건강 예측과 추천 메시지 설정
    if (score >= 80) {
        healthPredictionElement.textContent = '현재 건강 상태가 좋습니다. 앞으로도 이 습관을 유지하세요!';
        recommendationElement.textContent = '추천하는 병원 방문 및 약물 처방 사항이 없습니다.';
    } else if (score >= 60) {
        healthPredictionElement.textContent = '건강 상태가 양호하지만 개선이 필요할 수 있습니다.';
        recommendationElement.textContent = '정기적인 건강 검진을 권장합니다.';
    } else {
        healthPredictionElement.textContent = '건강 상태가 불안정할 수 있습니다. 적극적인 개선이 필요합니다.';
        recommendationElement.textContent = '전문 의사 상담을 받아보시기를 권장합니다.';
    }

    // 결과 컨테이너 표시
    resultContainer.classList.remove('d-none');
}
