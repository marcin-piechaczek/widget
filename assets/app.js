$(document).ready(function () {
  const sortLiderboard = (liderboardData) => {
    return liderboardData.sort(function (a, b) {
      if (a.rank > b.rank) {
        return 1;
      }
      if (a.rank < b.rank) {
        return -1;
      }
      return 0;
    });
  };

  const generateLiderboard = (liderboardData) => {
    const liderboardDataSorted = sortLiderboard(liderboardData);
    liderboardDataSorted.forEach((user) => {
      const listItem = `
        <li class="${
          user.id === 4
            ? "widget__leaderboard__list__item widget__leaderboard__list__item--active"
            : "widget__leaderboard__list__item"
        }">
            <div class="list__item__group">
                <span class="${
                  user.status === "active"
                    ? "list-item__rank"
                    : "list-item__rank list-item__rank--inactive"
                }">${user.rank}</span>
                <span class="list-item__name">${user.name}</span>
            </div>
            <div class="list__item__group list__item__group--right">
                <span class="list-item__score">${user.score}m</span>
                <span class="${
                  user.status === "active"
                    ? "list-item__icon"
                    : "list-item__icon--inactive"
                }"></span>
            </div>
        </li>`;
      $(".widget__leaderboard__list").append(listItem);
    });
  };

  const data = {
    metric: "m",
    week: {
      currentScore: 38,
      minsLeft: 12,
      currentStreak: 4,
      bestStreak: 12,
      leaderboards: [
        { id: 1, name: "Walter Wynne", score: 105, rank: 1, status: "active" },
        { id: 2, name: "Annabel Ferdinand", score: 52, rank: 2, status: "inactive" },
        { id: 3, name: "Marty McFly", score: 50, rank: 3, status: "active" },
        { id: 4, name: "You", score: 38, rank: 7, status: "active" },
      ],
    },
    month: {
      currentScore: 12,
      minsLeft: 186,
      currentStreak: 7,
      bestStreak: 44,
      leaderboards: [
        { id: 1, name: "Walter Wynne", score: 120, rank: 2, status: "active" },
        { id: 2, name: "Annabel Ferdinand", score: 156, rank: 1, status: "inactive" },
        { id: 3, name: "Marty McFly", score: 75, rank: 4, status: "active" },
        { id: 4, name: "You", score: 99, rank: 3, status: "active" },
      ],
    },
  };

  const progressScore = $(".progress__info__c-score");
  const goalStats = $(".stats_info__time");
  const currentStreak = $(".c-streak-score");
  const bestStreak = $(".b-streak-score");
  const progressLine = $(".widget__goal__progress__icon--line");

  const progressLineAnimation = (progressValue) => {
    progressLine.animate(
      {
        strokeDashoffset:
          progressValue >= 50 ? 0 : 480 - (480 * progressValue) / 50,
      },
      1000,
      "linear"
    );
  };

  const loadInitialData = () => {
    const initialData = data.week;

    progressScore.text(initialData.currentScore + data.metric);
    goalStats.text(initialData.minsLeft);
    currentStreak.text(initialData.currentStreak);
    bestStreak.text(initialData.bestStreak);

    progressLineAnimation(initialData.currentScore);
    generateLiderboard(initialData.leaderboards);
  };

  loadInitialData();

  $("#leaderboard").change(function () {
    $(".widget__leaderboard__list").empty();
    const selectedOption = $(this).children("option:selected").val();
    const currentValue = data[selectedOption];

    progressScore.text(currentValue.currentScore + data.metric);
    goalStats.text(currentValue.minsLeft);
    currentStreak.text(currentValue.currentStreak);
    bestStreak.text(currentValue.bestStreak);

    progressLineAnimation(currentValue.currentScore);
    generateLiderboard(currentValue.leaderboards);
  });
});
