import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class Calculator extends React.Component {
  constructor() {
    super();
    this.refOutcomeBox = React.createRef();
    var selectDiv = document.getElementById("odds-main");
    var valueDiv = selectDiv.getAttribute("value");
    var numberOfBets = selectDiv.getAttribute("bets");

    var arryValueDiv = valueDiv.split(" ");
    var arryValueLength = arryValueDiv.length;
    var betType = arryValueLength <= 1 ? valueDiv : arryValueDiv[0];

    this.state = {
      betType2numberOfBets: {
        accumulator: {
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          11: 11,
          12: 12,
          13: 13,
          14: 14,
          15: 15,
          16: 16,
          17: 17,
          18: 18,
          19: 19,
          20: 20
        },
        single: {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          11: 11,
          12: 12,
          13: 13,
          14: 14,
          15: 15,
          16: 16,
          17: 17,
          18: 18,
          19: 19,
          20: 20
        },
        double: {
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          11: 11,
          12: 12,
          13: 13,
          14: 14,
          15: 15,
          16: 16,
          17: 17,
          18: 18,
          19: 19,
          20: 20
        },
        treble: {
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          11: 11,
          12: 12,
          13: 13,
          14: 14,
          15: 15,
          16: 16,
          17: 17,
          18: 18,
          19: 19,
          20: 20
        },
        dutching: {
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          11: 11,
          12: 12,
          13: 13,
          14: 14,
          15: 15,
          16: 16,
          17: 17,
          18: 18,
          19: 19,
          20: 20
        },
        trixie: {
          3: 3
        }
      },
      betType: betType,
      numberOfBets: numberOfBets,
      oddsFormat: "decimal",
      betAmount: "10.00",
      eachOutlay: "10.00",
      totalOutlay: "10.00",
      stakeType: "combined",
      bets: 1,
      totReturn: "?",
      profit: "?",
      updatedReturn: false,
      outcomes: [
        {
          outcome: "winner",
          odds: "",
          valid: true,
          ruleValue: ""
        },
        {
          outcome: "winner",
          odds: "",
          valid: true,
          ruleValue: ""
        },
        {
          outcome: "winner",
          odds: "",
          valid: true,
          ruleValue: ""
        },
        {
          outcome: "winner",
          odds: "",
          valid: true,
          ruleValue: ""
        }
      ],
      numberOfBetsTooltip:
        "An accumulator is usually defined by at least four selections. Add up to twelve indivdiual selections to make up your accumulator.",
      suggestedStakes: [],
      ready: false,
      deadHeat: false,
      eachWay: false,
      rule4: false,
      errorMessage: true,
      optionValue: arryValueDiv,
      tooltip: false
    };
  }

  render() {
    return (
      <div className="main-container">
        <div className="container-a">
          <ChooseOddsFormat onChange={this.changeOddsFormat.bind(this)} />

          <ChooseStakeType
            changeStakeType={this.changeStakeType.bind(this)}
            isItDutchingOrAccumulator={
              this.state.betType === "dutching" ||
              (this.state.betType === "accumulator" &&
                this.state.eachWay === false)
            }
            selected={this.state.stakeType}
            isItDutching={this.state.betType === "dutching"}
            isItCombined={this.state.stakeType === "combined"}
          />

          {this.state.betType === "dutching" ? null : (
            <div className="choose-rules">
              <div className="each-way">
                <label className="label-title switch">
                  <input
                    className={this.state.eachWay ? "input-On" : "input-Off"}
                    type="checkbox"
                    onChange={this.handleEachWay.bind(this)}
                  />
                  <span className="slider round" />
                </label>
                <span>Each way?</span>
                <span className="question-mark-img tooltip">
                  <span className="tooltiptext">
                    An each way bet is two separate bets consisting of a win
                    bet, and a place bet.{" "}
                  </span>
                </span>
              </div>
              <div className="rule4">
                <label className="label-title switch">
                  <input
                    className={this.state.rule4 ? "input-On" : "input-Off"}
                    type="checkbox"
                    onChange={this.handleClickRule4.bind(this)}
                  />
                  <span className="slider round" />
                </label>
                <span>Rule 4</span>
                <span className="question-mark-img tooltip">
                  <span className="tooltiptext">
                    The Rule 4 is applied by the bookmakers to re-calculate odds
                    if certain horses don't run.
                  </span>
                </span>
              </div>
              <div className="dead-heat">
                <label className="label-title switch">
                  <input
                    className={this.state.deadHeat ? "input-On" : "input-Off"}
                    onChange={this.handleDeadHeat.bind(this)}
                    type="checkbox"
                  />
                  <span className="slider round" />
                </label>
                <span>Dead Heat</span>
                <span className="question-mark-img tooltip">
                  <span className="tooltiptext">
                    A race is considered a dead heat if two of the winning
                    horses finish exactly level with each other.
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="container-b">
          <ChooseBetTypeBox
            onChange={this.changeBetType.bind(this)}
            selected={this.state.betType}
            valueSelected={this.state.optionValue}
          />

          <ChooseNumberOfBets
            onChange={this.changeNumberOfBets.bind(this)}
            options={this.state.betType2numberOfBets[this.state.betType]}
            selected={this.state.numberOfBets}
            betType={this.state.betType}
            tooltip={this.state.numberOfBetsTooltip}
          />

          <SetStakeAmount
            setBetAmount={this.setBetAmount.bind(this)}
            isItDutching={this.state.betType === "dutching"}
            betAmount={this.state.betAmount}
            isItCombined={this.state.stakeType === "combined"}
          />
        </div>

        {this.state.betType === "dutching" ? (
          <DutchingOutcomeBox
            numberOfBets={this.state.numberOfBets}
            oddsFormat={this.state.oddsFormat}
            setOutcome={this.setOutcome.bind(this)}
            notDutchingOutcomes={this.state.outcomes}
            betAmount={this.state.betAmount}
            suggestedStakes={this.state.suggestedStakes}
            ready={this.state.ready}
            clearOutcome={this.clearOutcome.bind(this)}
            refresh={this.refresh.bind(this)}
            errorMessage={this.state.errorMessage}
            errorColor={this.state.errorColor}
          />
        ) : (
          <OutcomeBox
            oddsFormat={this.state.oddsFormat}
            dutchingOutcomes={this.state.outcomes}
            numberOfBets={this.state.numberOfBets}
            setOutcome={this.setOutcome.bind(this)}
            betAmount={this.state.betAmount}
            betType={this.state.betType}
            rule4Value={this.state.rule4}
            handleRule4Value={this.handleRule4Value.bind(this)}
            ref={this.refOutcomeBox}
            clearOutcome={this.clearOutcome.bind(this)}
            refresh={this.refresh.bind(this)}
            errorMessage={this.state.errorMessage}
            errorColor={this.state.errorColor}
            tooltip={this.state.tooltip}
          />
        )}

        <div className="container-d">
          <Outlay
            eachOutlay={this.state.eachOutlay}
            bets={this.state.bets}
            totalOutlay={this.state.totalOutlay}
          />
          <Return
            value={this.state.totReturn}
            updatedClass={this.state.updatedReturn}
            isItDutching={this.state.betType === "dutching"}
          />
          <Profit value={this.state.profit} />
        </div>
      </div>
    );
  }

  handleRule4Value() {
    this.setState({ rule4: !this.state.rule4 });
  }

  handleClickRule4() {
    this.refOutcomeBox.current.rule4ValueClick();
  }

  handleDeadHeat() {
    this.setState({ deadHeat: !this.state.deadHeat });
    this.refOutcomeBox.current.DeadHeatClick();
  }

  handleEachWay() {
    this.setState({ eachWay: !this.state.eachWay });
    this.refOutcomeBox.current.EachWayClick();
  }

  /*isTheWhatYouGetClass(isDutching) {
    var itIsDutching = isDutching === "dutching" ? "dutching" : "";
    return "container-d" + itIsDutching;
  }*/

  changeBetType(value) {
    var numberOfBets = this.state.numberOfBets,
      //bets = this.state.bets,
      numberOfBetsTooltip = this.state.numberOfBetsTooltip;
    switch (value) {
      case "single":
        numberOfBets = 1;
        numberOfBetsTooltip =
          "How many markets you would like to bet upon. If the number of selections is more than the appropriate amount for the bet type (eg. Single = 1, double = 2), then the bet is calculated as a perm.";
        break;
      case "double":
        numberOfBets = 2;
        numberOfBetsTooltip =
          "A double is made up on two individual selections. However, you can make more than two selections at a time, including an odd number, and then bet on each combination of double bets.";
        break;
      case "treble":
        numberOfBets = 3;
        numberOfBetsTooltip =
          "A triple is made up of three selections. It's possible to make more than three selections and select a triple bet, where all possible triple combinations will be bet upon.";
        break;
      case "accumulator":
        numberOfBets = numberOfBets < 4 ? 4 : numberOfBets;
        numberOfBetsTooltip =
          "An accumulator is usually defined by at least four selections. Add up to twelve indivdiual selections to make up your accumulator.";
        break;
      case "dutching":
        numberOfBets = numberOfBets < 2 ? 2 : numberOfBets;
        numberOfBetsTooltip =
          "Enter the number of individual selections you want to add, up to a maximum of twelve.";
        break;
      case "trixie":
        numberOfBets = 3;
        numberOfBetsTooltip = "A trixie is fixed at three selections.";
        break;
    }
    this.setState(
      {
        betType: value,
        numberOfBets: numberOfBets,
        outcomes: this.adjustOutcome(numberOfBets),
        numberOfBetsTooltip: numberOfBetsTooltip
      },
      this.setStakes
    );
  }
  changeNumberOfBets(value) {
    this.setState(
      {
        numberOfBets: value,
        outcomes: this.adjustOutcome(value)
      },
      this.setStakes
    );
  }

  changeOddsFormat(value) {
    this.setState({ oddsFormat: value });
  }

  changeStakeType(value) {
    this.setState({ stakeType: value }, this.setStakes);
  }
  setBetAmount(value) {
    for (var outcome of this.state.outcomes) {
      outcome.stake = +value;
    }
    this.setState({ betAmount: +value }, this.setStakes);
  }
  adjustOutcome(numberOfBets) {
    var outcomeLength = this.state.outcomes.length,
      outcomes = this.state.outcomes;
    if (outcomeLength > numberOfBets) {
      outcomes.splice(numberOfBets);
      this.setState({ outcomes: outcomes }, this.setStakes);
      return outcomes;
    }
    for (var k = outcomeLength; k < numberOfBets; k++) {
      outcomes.push({ outcome: "winner", odds: "", valid: true, stake: "" });
    }
    return outcomes;
  }
  setOutcome(outcome) {
    this.setState(
      {
        outcomes: outcome,
        update: true
      },
      this.setStakes
    );
  }

  refresh() {
    this.calculate();

    this.state.errorMessage === "Your results are calculated"
      ? (this.state.errorMessage = false)
      : null;
    this.state.errorMessage
      ? this.setState({
          errorMessage:
            "You have empty fields, or fields with wrong values. To be able to calculate your result, you need to fix all errors",
          errorColor: "error-message red",
          tooltip: true
        })
      : this.setState({
          errorMessage: "Your results are calculated",
          errorColor: "error-message green",
          tooltip: true
        });
  }

  clearOutcome(num) {
    this.changeNumberOfBets(num);
    var newOutcomes = [];
    for (let k = 1; k <= num; k++) {
      newOutcomes.push({
        outcome: "winner",
        odds: " ",
        valid: true,
        stake: " ",
        rule: 0,
        deadHeat: 1,
        eachwayValue: 1
      });
    }

    this.setState({
      betAmount: 10.0,
      stakeType: "combined",
      outcomes: newOutcomes,
      deadHeat: false,
      eachWay: false,
      rule4: false
    });
  }

  calculate() {
    if (
      this.state.betAmount &&
      this.state.betAmount > 0 &&
      this._oddsArePrepared.call(this)
    ) {
      console.log("calculate!"); //still keepin it for checks
      var res = 0,
        resDouble,
        resTreble;
      switch (this.state.betType) {
        case "single":
          for (var outcome of this.state.outcomes) {
            if (outcome.outcome === "winner") {
              this.state.rule4 ? outcome.ruleValue : (outcome.ruleValue = 0);
              this.state.deadHeat
                ? outcome.deadHeatValue
                : (outcome.deadHeatValue = 1);
              this.state.eachWay
                ? outcome.eachWayValue
                : (outcome.eachWayValue = 1);

              var valueSingle =
                ((outcome.odds - 1) * (1 - outcome.ruleValue / 100) + 1) *
                this.state.eachOutlay;
              var valueEach =
                (((outcome.odds - 1) / outcome.eachWayValue) *
                  (1 - outcome.ruleValue / 100) +
                  1) *
                this.state.eachOutlay;

              this.state.eachWay ? valueEach : (valueEach = 0);

              var total = valueSingle / outcome.deadHeatValue + valueEach;

              res += total;
            }
          }
          break;
        case "double":
          if (this.state.bets) {
            var outcome = this.state.outcomes,
              multiplier = 0,
              totalEach = 0;
            for (var i = 0; i < outcome.length - 1; i++) {
              for (var j = i + 1; j < outcome.length; j++) {
                if (
                  outcome[i].outcome === "winner" &&
                  outcome[j].outcome === "winner"
                ) {
                  this.state.rule4
                    ? outcome[i].ruleValue
                    : (outcome[i].ruleValue = 0);
                  this.state.rule4
                    ? outcome[j].ruleValue
                    : (outcome[j].ruleValue = 0);

                  var oddsA =
                    (outcome[i].odds - 1) * (1 - outcome[i].ruleValue / 100) +
                    1;
                  var valueEachA =
                    ((outcome[i].odds - 1) / outcome[i].eachWayValue) *
                      (1 - outcome[i].ruleValue / 100) +
                    1;

                  var oddsB =
                    (outcome[j].odds - 1) * (1 - outcome[j].ruleValue / 100) +
                    1;
                  var valueEachB =
                    ((outcome[j].odds - 1) / outcome[j].eachWayValue) *
                      (1 - outcome[j].ruleValue / 100) +
                    1;

                  totalEach += valueEachA * valueEachB * this.state.eachOutlay;
                  this.state.eachWay ? totalEach : (totalEach = 0);
                  multiplier +=
                    (oddsA / outcome[i].deadHeatValue) *
                    (oddsB / outcome[j].deadHeatValue);
                }
              }
            }
          }
          res = multiplier * this.state.eachOutlay + totalEach;
          break;

        case "treble":
          if (this.state.bets) {
            var outcome = this.state.outcomes,
              multiplier = 0;
            var totalEach = 0;
            for (var i = 0; i < outcome.length - 2; i++) {
              for (var j = i + 1; j < outcome.length - 1; j++) {
                for (var x = j + 1; x < outcome.length; x++) {
                  if (
                    outcome[i].outcome === "winner" &&
                    outcome[j].outcome === "winner" &&
                    outcome[x].outcome === "winner"
                  ) {
                    this.state.rule4
                      ? outcome[i].ruleValue
                      : (outcome[i].ruleValue = 0);
                    this.state.rule4
                      ? outcome[j].ruleValue
                      : (outcome[j].ruleValue = 0);
                    this.state.rule4
                      ? outcome[x].ruleValue
                      : (outcome[x].ruleValue = 0);

                    // OddsA
                    var oddsA =
                      (outcome[i].odds - 1) * (1 - outcome[i].ruleValue / 100) +
                      1;
                    var valueEachA =
                      ((outcome[i].odds - 1) / outcome[i].eachWayValue) *
                        (1 - outcome[i].ruleValue / 100) +
                      1;

                    //OddsB
                    var oddsB =
                      (outcome[j].odds - 1) * (1 - outcome[j].ruleValue / 100) +
                      1;
                    var valueEachB =
                      ((outcome[j].odds - 1) / outcome[j].eachWayValue) *
                        (1 - outcome[j].ruleValue / 100) +
                      1;

                    //OddsC
                    var oddsC =
                      (outcome[x].odds - 1) * (1 - outcome[x].ruleValue / 100) +
                      1;
                    var valueEachC =
                      ((outcome[x].odds - 1) / outcome[x].eachWayValue) *
                        (1 - outcome[x].ruleValue / 100) +
                      1;

                    totalEach +=
                      valueEachA *
                      valueEachB *
                      valueEachC *
                      this.state.eachOutlay;
                    this.state.eachWay ? totalEach : (totalEach = 0);

                    multiplier +=
                      (oddsA / outcome[i].deadHeatValue) *
                      (oddsB / outcome[j].deadHeatValue) *
                      (oddsC / outcome[x].deadHeatValue);
                  }
                }
              }
            }
            res = multiplier * this.state.eachOutlay + totalEach;
            break;
          }
        case "accumulator":
          var multiplier = 1;
          var totalEach = 1;
          for (var outcome of this.state.outcomes) {
            if (outcome.outcome === "winner") {
              this.state.rule4 ? outcome.ruleValue : (outcome.ruleValue = 0);
              this.state.deadHeat
                ? outcome.deadHeatValue
                : (outcome.deadHeatValue = 1);
              this.state.eachWay
                ? outcome.eachWayValue
                : (outcome.eachWayValue = 1);

              var oddsA =
                (outcome.odds - 1) * (1 - outcome.ruleValue / 100) + 1;

              var valueEach =
                ((outcome.odds - 1) / outcome.eachWayValue) *
                  (1 - outcome.ruleValue / 100) +
                1;
              totalEach *= valueEach;

              this.state.eachWay ? totalEach : (totalEach = 0);

              multiplier *= oddsA / outcome.deadHeatValue;
            } else if (outcome.outcome === "lost") {
              multiplier = 0;
              continue;
            }
          }
          res =
            multiplier * this.state.eachOutlay +
            totalEach * this.state.eachOutlay;
          break;
        case "dutching":
          var outcome = this.state.outcomes,
            betAmount = +this.state.betAmount,
            adder,
            perc,
            fixedAdder,
            suggestedStakes = [],
            loosingStake = [],
            winningStake = [],
            netProfit,
            adders = [];
          for (var i = 0; i < outcome.length; i++) {
            if (outcome[i].odds) {
              adder = betAmount / outcome[i].odds;
            }
            fixedAdder = adder.toFixed(2);
            adders[i] = +fixedAdder;
            var sum = adders.reduce(function(a, b) {
              return a + b;
            }, 0);
          }
          perc = +(betAmount / sum);
          for (var x = 0; x < adders.length; x++) {
            suggestedStakes[x] = +(adders[x] * perc).toFixed(2);
            loosingStake[x] = +(betAmount - suggestedStakes[x]).toFixed(2);
            winningStake[x] = +(
              suggestedStakes[x] *
              (outcome[x].odds - 1)
            ).toFixed(2);
            netProfit = +(winningStake[0] - loosingStake[0]).toFixed(2);
          }
          this.setState({ suggestedStakes: suggestedStakes });
          if (netProfit > 0) {
            res = +Math.round((betAmount + netProfit) * 1e12) / 1e12;
          } else {
            var posNetProfit = Math.abs(netProfit);
            res = betAmount - posNetProfit;
          }
          break;
        case "trixie":
          var outcome = this.state.outcomes,
            multiplierDouble = 0,
            multiplierTreble = 0,
            totalEach = 0;
          for (var i = 0; i < outcome.length - 1; i++) {
            for (var j = i + 1; j < outcome.length; j++) {
              var oddsA =
                (outcome[i].odds - 1) * (1 - outcome[i].ruleValue / 100) + 1;

              var valueEachA =
                ((outcome[i].odds - 1) / outcome[i].eachWayValue) *
                  (1 - outcome[i].ruleValue / 100) +
                1;

              var oddsB =
                (outcome[j].odds - 1) * (1 - outcome[j].ruleValue / 100) + 1;

              var valueEachB =
                ((outcome[j].odds - 1) / outcome[j].eachWayValue) *
                  (1 - outcome[j].ruleValue / 100) +
                1;

              totalEach += valueEachA * valueEachB * this.state.eachOutlay;
              this.state.eachWay ? totalEach : (totalEach = 0);

              multiplierDouble +=
                (outcome[i].outcome === "void"
                  ? 1
                  : outcome[i].outcome === "lost"
                  ? 0
                  : oddsA / outcome[i].deadHeatValue) *
                (outcome[j].outcome === "void"
                  ? 1
                  : outcome[j].outcome === "lost"
                  ? 0
                  : oddsB / outcome[j].deadHeatValue);
            }
          }
          resDouble = multiplierDouble * this.state.eachOutlay;
          for (var i = 0; i < outcome.length - 2; i++) {
            for (var j = i + 1; j < outcome.length - 1; j++) {
              for (var x = j + 1; x < outcome.length; x++) {
                var oddsA =
                  (outcome[i].odds - 1) * (1 - outcome[i].ruleValue / 100) + 1;
                var valueEachA =
                  ((outcome[i].odds - 1) / outcome[i].eachWayValue) *
                    (1 - outcome[i].ruleValue / 100) +
                  1;

                //OddsB
                var oddsB =
                  (outcome[j].odds - 1) * (1 - outcome[j].ruleValue / 100) + 1;
                var valueEachB =
                  ((outcome[j].odds - 1) / outcome[j].eachWayValue) *
                    (1 - outcome[j].ruleValue / 100) +
                  1;

                //OddsC
                var oddsC =
                  (outcome[x].odds - 1) * (1 - outcome[x].ruleValue / 100) + 1;
                var valueEachC =
                  ((outcome[x].odds - 1) / outcome[x].eachWayValue) *
                    (1 - outcome[x].ruleValue / 100) +
                  1;

                totalEach +=
                  valueEachA * valueEachB * valueEachC * this.state.eachOutlay;
                this.state.eachWay ? totalEach : (totalEach = 0);

                if (
                  !(
                    outcome[i].outcome === "lost" ||
                    outcome[j].outcome === "lost" ||
                    outcome[x].outcome === "lost"
                  )
                ) {
                  multiplierTreble +=
                    (outcome[i].outcome === "void"
                      ? 1
                      : oddsA / outcome[i].deadHeatValue) *
                    (outcome[j].outcome === "void"
                      ? 1
                      : oddsB / outcome[j].deadHeatValue) *
                    (outcome[x].outcome === "void"
                      ? 1
                      : oddsC / outcome[x].deadHeatValue);
                }
              }
            }
          }
          resTreble = multiplierTreble * this.state.eachOutlay + totalEach;
          res = resDouble + resTreble;
          break;
      }

      this.setState({
        totReturn: res.toFixed(2),
        profit: (res - this.state.totalOutlay).toFixed(2),
        updatedReturn: true,
        ready: true,
        errorMessage: false,
        tooltip: false
      });
    } else {
      this.setState({
        totReturn: "?",
        profit: "?",
        updatedReturn: false,
        ready: false,
        errorMessage: true,
        tooltip: false
      });
      console.log("not ready to calculate"); //still keepin it for checks
    }
  }

  setStakes() {
    var bets = 1,
      num = 0;
    for (var outcome of this.state.outcomes) {
      if (outcome.outcome !== "void") {
        num++;
      }
    }
    switch (this.state.betType) {
      case "single":
        bets = num;
        this.state.eachWay ? (bets = 2 * num) : null;
        break;
      case "double":
        if (num < 2) bets = 1;
        else {
          this.state.eachWay
            ? (bets = (fak(num) / (fak(2) * fak(num - 2))) * 2)
            : (bets = fak(num) / (fak(2) * fak(num - 2)));
        }
        break;
      case "treble":
        if (num < 3) bets = 1;
        else {
          this.state.eachWay
            ? (bets = (fak(num) / (fak(3) * fak(num - 3))) * 2)
            : (bets = fak(num) / (fak(3) * fak(num - 3)));
        }
        break;
      case "accumulator":
        this.state.eachWay ? (bets = 2) : (bets = 1);
        break;
      case "trixie":
        this.state.eachWay ? (bets = 8) : (bets = 4);
        break;
      default:
        break;
    }
    var betAmount = +this.state.betAmount,
      totalOutlay = betAmount,
      eachOutlay = betAmount / bets;
    if (this.state.stakeType === "each") {
      totalOutlay = betAmount * bets;
      eachOutlay = betAmount;
    }
    this.setState(
      {
        bets: bets,
        eachOutlay: eachOutlay.toFixed(2),
        totalOutlay: totalOutlay.toFixed(2)
      },
      this.calculate
    );
    function fak(n) {
      var f = 1;
      for (let k = 1; k <= n; k++) {
        f *= k;
      }
      return f;
    }
  }
  _oddsArePrepared() {
    var state = this.state;
    return (
      +state.numberOfBets === state.outcomes.length &&
      (function() {
        var result = true;
        for (var outcome of state.outcomes) {
          if (
            !(outcome.odds && outcome.odds > 1) &&
            outcome.outcome === "winner"
          ) {
            result = false;
          }
        }
        return result;
      })()
    );
  }
}

class ChooseBetTypeBox extends React.Component {
  constructor(props) {
    super(props);
    var arryValueDiv = this.props.valueSelected;
    var valueObject = arryValueDiv.reduce((acc, elem) => {
      acc[elem] = elem;
      return acc;
    }, {});
    this.state = {
      options: valueObject,
      betTypeTooltip:
        "A single bet on a single selection or market. You can make multiple single bets at a time, but each bet is individual and the odds would not be accumulated.",
      chooseModalContent1:
        "Welcome to our single calculator web application, this is your one stop shop for calculating payouts and returns on one of the simplest bet types in sports gambling. The returns that you receive from a single bet are very straight forward, and with this bet type you won’t need much outside of a basic intuition for basic gambling concepts to fully understand single bets. Check out the application here for a quick breakdown. ",
      chooseModalContent2: " ",
      tooltipVisible: false,
      betTypeModal: false,
      betTypeSelected: "Single",
      betTypeValue: "single",
      chooseBetModal: false,
      betTypeValueUpperCase: "Single"
    };
  }

  render() {
    var x, y;
    this.state.betTypeModal
      ? (x = "show modal-container")
      : (x = "hide modal-container");
    this.state.betTypeModal
      ? (y = "toggle-button  open")
      : (y = "toggle-button");

    if (Object.keys(this.state.options).length > 1) {
      return (
        <div className="choose-bettype">
          <label className="label-title">Bet Type</label>
          <div className={x}>
            <p className="p-information">
              {this.state.betTypeTooltip}
              <strong>
                <a href={this.state.betTypeValue + "/"}>more...</a>
              </strong>
            </p>
            <a className="close" onClick={this.toggleModal.bind(this)} />
            <span className="options">{this.getOptions()}</span>
            <button onClick={this.applyBetType.bind(this)}>Apply</button>
          </div>
          <div className="list-and-tooltip">
            <button className={y} onClick={this.toggleModal.bind(this)}>
              {this.state.betTypeSelected}
              <span />
            </button>
            <span
              onClick={this.openModalBox.bind(this)}
              className="question-mark-img"
            />
          </div>
          {this.state.chooseBetModal ? (
            <ChooseBetModal
              chooseModalContent1={this.state.chooseModalContent1}
              chooseModalContent2={this.state.chooseModalContent2}
              betTypeValue={this.state.betTypeValue}
              betTypeSelected={this.state.betTypeSelected}
              betTypeValueUpperCase={this.state.betTypeValueUpperCase}
              closeModal={this.closeModalBox.bind(this)}
            />
          ) : null}
        </div>
      );
    } else {
      var singleBetType = Object.keys(this.state.options);
      var singlebetTypeConverty = singleBetType.join();
      var singlebetTypeString =
        singlebetTypeConverty.charAt(0).toUpperCase() +
        singlebetTypeConverty.slice(1);

      //this.setState({ betType: singlebetTypeConverty1 });

      return (
        <div>
          <div className="single-title">
            <span>{singlebetTypeString} Calculator</span>
          </div>
        </div>
      );
    }
  }

  closeModalBox() {
    this.setState({
      chooseBetModal: false
    });
  }

  openModalBox() {
    this.setState({
      chooseBetModal: true
    });
  }

  applyBetType() {
    var value = this.state.betTypeValue;
    var betTypeSelected = value.charAt(0).toUpperCase() + value.slice(1);
    var betTypeValue = this.state.betTypeValue;
    this.props.onChange(betTypeValue);

    this.setState({
      betTypeModal: !this.state.betTypeModal,
      betTypeSelected: betTypeSelected
    });
  }

  toggleModal() {
    this.setState({
      betTypeModal: !this.state.betTypeModal,
      chooseBetModal: false
    });
  }

  //this function sets the selected state and calls the onChange function that was passed in the parent component
  changeBetType(e) {
    //this.props.onChange(e.target.value);
    var betTypeTooltip = this.state.betTypeTooltip;
    var chooseModalContent1 = this.state.chooseModalContent1;
    var chooseModalContent2 = this.state.chooseModalContent2;
    var value = e.target.value;
    var betTypeValueUpperCase = value.charAt(0).toUpperCase() + value.slice(1);

    switch (value) {
      case "single":
        betTypeTooltip =
          "A single bet on a single selection or market. You can make multiple single bets at a time, but each bet is individual and the odds would not be accumulated.";
        chooseModalContent1 =
          "Welcome to our single calculator web application, this is your one stop shop for calculating payouts and returns on one of the simplest bet types in sports gambling. The returns that you receive from a single bet are very straight forward, and with this bet type you won’t need much outside of a basic intuition for basic gambling concepts to fully understand single bets. Check out the application here for a quick breakdown. ";
        chooseModalContent2 = "";
        break;
      case "double":
        betTypeTooltip =
          "A double consists of two selections, where both selections must come in for the bet to win and the odds of both are multiplied by each other.";
        chooseModalContent1 =
          "On this page you will find our double calculator web tool. Everything you need to calculate profit, potential payouts, and even losses can be done here. Although it is a pretty simple type of bet, there is still some work to be done in order to figure out the numbers. It’s a very good bet to start your journey with, so we’d recommend practicing on this one before moving on to more complicated ones in the future. Check out the tool here for an easy to use method.";
        chooseModalContent2 = "";
        break;
      case "treble":
        betTypeTooltip =
          "A triple consists of three selections and all three must come in for the bet to win.";
        chooseModalContent1 =
          "The simplicity of our treble calculator means that you will instantly be able to determine if the bet you’re planning is worth it. The immediate breakdown of profit, of stake is a helpful indicator that can assist all those involved in treble style bets at the sportsbook. The calculator you see below has been pre-configured to the needs of a punter placing a treble. Use the data entry fields accordingly to view the breakdown of your bet of three selections.";
        chooseModalContent2 = "";
        break;
      case "accumulator":
        betTypeTooltip =
          "An accumulator - or parlay - is a single bet that consists of four or more selections, with the odds of the selections accumulated. All individual selections must come in for the bet to win.";
        chooseModalContent1 =
          "If you’re a fan of accumulator betting, you’ll know that calculating the often huge potential returns isn’t easy. That’s why we’ve created this accumulator calculator as a one-stop shop for adding up your returns of your accas. With these types of bets, the clue really is in the name – odds from multiple selections are accumulated to offer large returns, but each individual selection must win for the bet to win as a whole.";
        chooseModalContent2 = "";
        break;
      case "dutching":
        betTypeTooltip =
          "Dutching is a betting system that allows a stake to be divided across multiple selections so that the winnings are the same whichever selection wins.";
        chooseModalContent1 =
          "The Dutching calculator that we have created in the element below is your quickest way to see the immediate returns of your bets. The dutching bet is a classic way to split your stake between two different bets and guarantee yourself a profit if only one of your bets wins. The calculator will show you exactly how much your profit could be depending on the success of the two different bets that you’re making. Enter the necessary data in the dutching returns calculator fields and then let the numbers dictate your next steps at the sportsbook.";
        chooseModalContent2 = "";
        break;
      case "trixie":
        betTypeTooltip =
          "A trixie consists of three selections that will build up four bets: three doubles and a treble.";
        chooseModalContent1 =
          "Welcome to our trixie calculator page. Here you will find our tool to easily work out your bet. You can quickly see profit potential, and how different odds can affect your return. Our calculator does all the hard work for you, so you will not have to do any maths! Check it out below and see what you think.";
        chooseModalContent2 = "";
        break;
    }

    this.setState({
      betTypeTooltip: betTypeTooltip,
      betTypeValue: value,
      chooseModalContent1: chooseModalContent1,
      chooseModalContent2: chooseModalContent2,
      betTypeValueUpperCase: betTypeValueUpperCase
    });
  }

  tooltipClicked() {
    this.setState({ tooltipVisible: !this.state.tooltipVisible });
  }

  getOptions() {
    var optionsElement = [];
    for (var key in this.state.options) {
      optionsElement.push(
        <label
          key={key}
          htmlFor={key}
          className={key === this.state.betTypeValue ? "checked" : "unchecked"}
        >
          <span>
            <input
              id={key}
              type="radio"
              name="type"
              value={key}
              onChange={this.changeBetType.bind(this)}
              checked={key === this.state.betTypeTooltip ? true : false}
            />
            <span htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <div className="check" />
          </span>
        </label>
      );
    }
    return optionsElement;
  }
}

class ChooseBetModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="choose-bet-modal">
        <a onClick={this.props.closeModal} className="close" />
        <div className="title">
          What is an {this.props.betTypeValueUpperCase} Bet?
        </div>
        <div className="img-modal">
          <img
            src="/wp-content/themes/generic/js/odds-calculator-images/popup-odds-calculator.jpg"
            alt="A hand typing on a keyboard on a cluttered desk"
          />
        </div>
        <div className="content">
          <p>{this.props.chooseModalContent1}</p>
          <p>{this.props.chooseModalContent2}</p>
        </div>
        <div className="buttons">
          <div onClick={this.props.closeModal} className="button-close">
            Close
          </div>
          <div className="button-page active">
            <a href={this.props.betTypeValue + "/"}>To the page</a>
          </div>
        </div>
      </div>
    );
  }
}

class TooltipDiv extends React.Component {
  render() {
    return (
      <div className={this.isTheClass(this.props.leftOrNot)}>
        {this.props.children}
      </div>
    );
  }

  isTheClass(leftOrNot) {
    var left = leftOrNot ? "left" : "";
    return "tooltipdiv " + left;
  }
}

class ChooseNumberOfBets extends React.Component {
  constructor() {
    super();
    this.state = {
      tooltipVisible: false
    };
  }

  render() {
    return (
      <div className="selections">
        <label className="label-title">Selections</label>
        <div className="list-and-tooltip">
          <select
            onChange={this.changeNumberOfBets.bind(this)}
            value={this.props.selected}
          >
            {this.getOptions(this.props.options)}
          </select>
        </div>
      </div>
    );
  }

  changeNumberOfBets(event) {
    this.props.onChange(event.target.value);
  }

  tooltipClicked() {
    this.setState({ tooltipVisible: !this.state.tooltipVisible });
  }

  getOptions(options) {
    var optionsElement = [];
    for (var key in options) {
      optionsElement.push(
        <option key={key} value={key}>
          {options[key]}
        </option>
      );
    }
    return optionsElement;
  }
}

class ChooseOddsFormat extends React.Component {
  constructor() {
    super();
    this.state = {
      optionDefault: "decimal",
      options: {
        decimal: "Decimal",
        fractional: "Fractional",
        american: "American"
      },
      tooltipVisible: false
    };
  }

  render() {
    return (
      <div className="odds-format">
        <label className="label-title">Odds Format</label>
        <ul onChange={this.changeOddsFormat.bind(this)}>
          {this.getOptions(this.state.options)}
        </ul>
      </div>
    );
  }

  getOptions(options) {
    var optionsValue = ["(2.25)", "(2/1)", "(£100)"];
    var optionDefault = this.state.optionDefault;
    var optionsElement = Object.keys(options).map(function(key, index) {
      return (
        <li
          key={key}
          className={key == optionDefault ? "checked" : "unchecked"}
        >
          <input
            type="radio"
            name="type"
            id={key}
            defaultChecked={key == optionDefault ? true : false}
            value={key}
          />
          <label htmlFor={key}>{options[key]}</label>
          <div className="check" />
          <span>{optionsValue[index]}</span>
        </li>
      );
    });

    return optionsElement;
  }

  changeOddsFormat(e) {
    var value = e.target.value;
    this.props.onChange(value);
    this.setState({ optionDefault: e.target.value });
  }
}

class EachWay extends React.Component {
  constructor(props) {
    super(props);
  }

  getSelectValue(e) {
    var val = e.target.value;
    this.props.onSelectValue(val);
  }

  getEachWay() {
    var optionsDeadHeat = [];
    for (var key = 1; key <= 8; key += 1) {
      optionsDeadHeat.push(
        <option key={key} value={key}>
          1/{key}
        </option>
      );
    }
    return optionsDeadHeat;
  }

  render() {
    return (
      <td className="selection-field">
        <select
          onChange={this.getSelectValue.bind(this)}
          className="selection-outcome each-way"
          id={"each" + this.props.idnumber}
        >
          {this.getEachWay()}
        </select>
      </td>
    );
  }
}

class DeadHeatFormatFild extends React.Component {
  constructor(props) {
    super(props);
  }

  getSelectValue(e) {
    var val = e.target.value;
    this.props.onSelectValue(val);
  }

  getDeadHeat() {
    var optionsDeadHeat = [];
    for (var key = 1; key <= 8; key += 1) {
      optionsDeadHeat.push(
        <option key={key} value={key}>
          {key}
        </option>
      );
    }
    return optionsDeadHeat;
  }

  render() {
    return (
      <td className="selection-field">
        <select
          onChange={this.getSelectValue.bind(this)}
          className="selection-outcome dead-head"
          id={"dead" + this.props.idnumber}
        >
          {this.getDeadHeat()}
        </select>
      </td>
    );
  }
}

class Rule4FormatFild extends React.Component {
  constructor(props) {
    super(props);
  }

  getSelectValue(e) {
    var val = e.target.value;
    this.props.onSelectValue(val);
  }

  getRule4() {
    var optionsRule4 = [];
    for (var key = 0; key <= 90; key += 5) {
      optionsRule4.push(
        <option key={key} value={key}>
          {key}%
        </option>
      );
    }
    return optionsRule4;
  }

  render() {
    return (
      <td className="selection-field">
        <select
          onChange={this.getSelectValue.bind(this)}
          className="selection-outcome rule4"
          id={"rule" + this.props.idnumber}
        >
          {this.getRule4()}
        </select>
      </td>
    );
  }
}

class OutcomeBox extends React.Component {
  constructor() {
    super();
    this.state = {
      options: {
        winner: "Winner",
        lost: "Lost",
        void: "Void"
      },
      tooltipVisible: false,
      oddsTooltipVisible: false,
      numberOfRows: 4,
      //outcomes: [],
      outcomeTooltip:
        "How the selection fared in the event, whether it won, lost, or the selection was voided.",
      oddsTooltip: "The odds at which the bet was placed.",
      rule4: false,
      deadHeat: false,
      eachWay: false
    };
  }

  render() {
    return (
      <div className="container-c">
        <div className="table-container">
          <div className="option-table-menu">
            <span onClick={this.props.refresh} className="clear">
              Refresh
            </span>

            <span onClick={this.clearOutcome.bind(this)} className="clear">
              Clear
            </span>
          </div>
          <table className="table">
            <tbody>
              <tr className="outcome-titles">
                <th className="outcome-header" id="order">
                  Selection
                </th>
                <th className="outcome-header" id="outcome">
                  Outcome
                </th>

                <th className="outcome-header" id="odds">
                  Odds
                </th>

                {this.state.rule4 ? (
                  <th className="outcome-header">Rule 4</th>
                ) : null}
                {this.state.deadHeat ? (
                  <th className="outcome-header">Dead Heat</th>
                ) : null}

                {this.state.eachWay ? (
                  <th className="outcome-header">Each Way</th>
                ) : null}
              </tr>
              {this.getRows(this.props.numberOfBets)}
            </tbody>
          </table>
          {this.props.errorMessage === true ||
          this.props.errorMessage === false ? null : (
            <div className={this.props.errorColor}>
              <span>{this.props.errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  rule4ValueClick() {
    this.setState({ rule4: !this.state.rule4 });
    this.props.handleRule4Value();
    this.setOutcome(this.props.numberOfBets);
  }

  DeadHeatClick() {
    this.setState({ deadHeat: !this.state.deadHeat });
    this.setOutcome(this.props.numberOfBets);
  }

  EachWayClick() {
    this.setState({ eachWay: !this.state.eachWay });
    this.setOutcome(this.props.numberOfBets);
  }

  tooltipClicked() {
    this.setState({ tooltipVisible: !this.state.tooltipVisible });
  }

  oddsTooltipClicked() {
    this.setState({ oddsTooltipVisible: !this.state.oddsTooltipVisible });
  }

  getValue() {
    this.setOutcome(this.props.numberOfBets);
  }

  getRows(num) {
    var rows = [];
    for (let k = 1; k <= num; k++) {
      var outcome = "outcome" + k,
        odds = "odds" + k,
        classNameSelect = "selection-outcome " + selectedOutcome,
        selectedOutcome = this.props.dutchingOutcomes[k - 1]
          ? this.props.dutchingOutcomes[k - 1].outcome
          : "winner";
      var inputClass =
        this.props.oddsFormat === "fractional" ? "fractional" : null;
      rows.push(
        //Input Field needs to depend on odds Format + getOptions function added instead of options list
        <tr key={k}>
          <td className="selection-field idnumber">{k}</td>
          <td className="selection-field outcome">
            <select
              className={"selection-outcome " + selectedOutcome}
              value={selectedOutcome}
              onChange={this.setOutcome.bind(this, num)}
              id={outcome}
            >
              {this.getOptions(this.state.options, k)}
            </select>
          </td>

          <td key={k + "a"} className={"selection-field odds " + inputClass}>
            {this.getOddsInputFormat(
              odds,
              this.props.dutchingOutcomes[k - 1],
              this.props.oddsFormat,
              num,
              this.props.betAmount
            )}
          </td>

          {this.state.rule4 ? (
            <Rule4FormatFild
              onSelectValue={this.getValue.bind(this)}
              idnumber={k}
            />
          ) : null}

          {this.state.deadHeat ? (
            <DeadHeatFormatFild
              onSelectValue={this.getValue.bind(this)}
              idnumber={k}
            />
          ) : null}

          {this.state.eachWay ? (
            <EachWay onSelectValue={this.getValue.bind(this)} idnumber={k} />
          ) : null}
        </tr>
      );
    }
    return rows;
  }

  getOptions(options, k) {
    var optionsElement = [];
    for (var key in options) {
      var uniqueKey = k + key;
      optionsElement.push(
        <option className={key} key={uniqueKey} value={key}>
          {options[key]}
        </option>
      );
    }
    return optionsElement;
  }

  getOddsInputFormat(odd, outcome, format, num, betAmount) {
    var visible = !outcome || outcome["outcome"] === "winner",
      value = outcome ? outcome.odds : "",
      inputField = "";
    if (!visible) return null;
    switch (format) {
      case "decimal":
        inputField = (
          <span
            className={this.isTheClass(format, outcome, true)}
            data-tooltip={this.isTheClass(format, outcome, false)}
          >
            <input
              type="number"
              pattern="[0-9\.]*"
              step="any"
              maxLength="6"
              className={this.isTheClass(format, outcome, true)}
              id={odd}
              value={value}
              onChange={this.setOutcome.bind(this, num)}
            />
          </span>
        );
        return inputField;
        break;
      case "fractional":
        var numeratorId = "numerator-" + odd,
          denominatorId = "denominator-" + odd,
          numerator = "",
          denominator = "";
        if (document.getElementById(numeratorId)) {
          numerator = document.getElementById(numeratorId).value;
          denominator = document.getElementById(denominatorId).value;
        } else if (value > 1) {
          var initialNumerator = (value - 1).toFixed(3),
            factor = 1;
          numerator = initialNumerator;
          denominator = 1;
          while (numerator % 1 && factor < 1000) {
            numerator = initialNumerator * ++factor;
          }
          numerator = Math.round(numerator);
          denominator = factor;
        }
        inputField = [
          <input
            key={"n1"}
            type="number"
            pattern="[0-9]*"
            step="any"
            className={this.isTheClass(format, outcome)}
            maxLength="5"
            id={numeratorId}
            value={numerator}
            onChange={this.setOutcome.bind(this, num)}
          />,
          <span className="fractionSep">/</span>,
          <input
            key={"n2"}
            type="number"
            pattern="[0-9]*"
            step="any"
            className={this.isTheClass(format, outcome)}
            maxLength="5"
            id={denominatorId}
            value={denominator}
            onChange={this.setOutcome.bind(this, num)}
          />
        ];
        return inputField;
        break;
      case "american":
        var americanValue = value;
        if (outcome && outcome.valid && value >= 2) {
          americanValue = Number((value - 1).toFixed(2) * 100);
        } else if (outcome && outcome.valid && value > 1) {
          americanValue = Number(-100 / (value - 1).toFixed(2));
        }
        inputField = (
          <input
            type="number"
            pattern="[0-9\.]*"
            step="any"
            maxLength="6"
            className={this.isTheClass(format, outcome)}
            value={americanValue}
            id={odd}
            onChange={this.setOutcome.bind(this, num)}
          />
        );
        return inputField;
        break;
      default:
        inputField = (
          <input
            type="number"
            pattern="[0-9\.]*"
            step="any"
            maxLength="6"
            className={this.isTheClass(format, outcome)}
            id={odd}
            onChange={this.setOutcome.bind(this, num)}
          />
        );
        return inputField;
        break;
    }
  }

  isTheClass(format, outcome, tooltipCheck) {
    var selectedValid = outcome ? outcome.valid : 1,
      selectedOdd = outcome ? outcome.odds : 1,
      selectedStake = outcome.stake ? true : false,
      validClass = "";
    var tooltip = "";
    if (selectedOdd === "") {
      selectedValid = true;
    }
    if (
      selectedValid === true &&
      selectedOdd === "" &&
      selectedStake === true
    ) {
      validClass = "empty";
      tooltip = "This field is empty";
    } else if (selectedValid === 1 || selectedValid === true) {
      validClass = "valid";
    } else if (selectedValid === false || selectedOdd !== "") {
      validClass = "not-valid";
      tooltip = "Invalid value";
    }
    if (tooltipCheck) {
      return "odds-value " + format + " " + validClass;
    } else if (
      this.props.tooltip ||
      (selectedValid === false || selectedOdd !== "")
    ) {
      return tooltip;
    }
  }

  inputTooltip(dataTooltip) {
    return dataTooltip;
  }

  setOutcome(num) {
    //var notWinner = event.target.value,
    var newOutcomes = [],
      //  notANumber = Number.isNaN(notWinner),
      betAmount = this.props.betAmount;
    for (let k = 1; k <= num; k++) {
      newOutcomes.push({
        outcome: document.getElementById("outcome" + k)
          ? document.getElementById("outcome" + k).value
          : "",
        odds: this._getOdds(k),
        valid: this._isValid(k),
        stake: +betAmount,
        ruleValue: this.state.rule4 ? this._getRule4(k) : 0,
        deadHeatValue: this.state.deadHeat ? this._getDeadHeat(k) : 1,
        eachWayValue: this.state.eachWay ? this._getEachWay(k) : 1
      });
    }
    //this.setState({outcomes: newOutcomes});
    this.props.setOutcome(newOutcomes);
  }

  clearOutcome() {
    this.setState({
      rule4: false,
      deadHeat: false,
      eachWay: false
    });
    var num = 1;
    var betType = this.props.betType;
    switch (betType) {
      case "single":
        num = 1;
        break;
      case "double":
        num = 2;
        break;
      case "treble":
        num = 3;
        break;
      case "accumulator":
        num = 4;
        break;
      case "dutching":
        num = 2;
        break;
      case "trixie":
        num = 3;
        break;
      default:
        num = 1;
    }

    this.setOutcome(0, false);
    this.props.clearOutcome(num);
  }

  _getRule4(k) {
    var selector = document.getElementById("rule" + k).value;
    selector === undefined ? 0 : selector;
    return selector;
  }

  _getDeadHeat(k) {
    var selector = document.getElementById("dead" + k).value;
    selector === undefined ? 1 : selector;
    return selector;
  }
  _getEachWay(k) {
    var selector = document.getElementById("each" + k).value;
    selector === undefined ? 1 : selector;
    return selector;
  }

  _getOdds(k) {
    switch (this.props.oddsFormat) {
      case "decimal":
        var input = document.getElementById("odds" + k);
        if (!input) return "";
        return input && input.value
          ? Math.round(input.value * 10000) / 10000
          : "";
      case "fractional":
        var input = document.getElementById("numerator-odds" + k);
        if (!input) return "";
        var fractional =
            (document.getElementById("numerator-odds" + k).value * 10000) /
              document.getElementById("denominator-odds" + k).value /
              10000 +
            1,
          fractionalFixed = Math.round(fractional * 1e2) / 1e2,
          input1 = document.getElementById("numerator-odds" + k),
          input2 = document.getElementById("denominator-odds" + k);
        if (!input1 || !input2) return "";
        return document.getElementById("denominator-odds" + k).value &&
          document.getElementById("numerator-odds" + k).value
          ? fractionalFixed
          : "";
      case "american":
        var input = document.getElementById("odds" + k);
        if (!input) return "";
        var positiveVal = Math.abs(input.value);
        if (input.value < 100 && input.value > -100) return input.value;
        return input.value >= 0
          ? (Math.round((input.value * 10000) / 100) / 10000 + 1).toFixed(2)
          : input.value < 0
          ? (Math.round((100 / positiveVal) * 10000) / 10000 + 1).toFixed(2)
          : "";
    }
  }

  _isValid(k) {
    switch (this.props.oddsFormat) {
      case "decimal":
        var input = document.getElementById("odds" + k);
        if (!input) return false;
        return input.value > 1;
      case "fractional":
        var input1 = document.getElementById("numerator-odds" + k);
        var input2 = document.getElementById("denominator-odds" + k);
        if (!input1 || !input2) return false;
        return input1.value > 0 && input2.value > 0;
      case "american":
        var input = document.getElementById("odds" + k);
        if (!input) return false;
        return input.value >= 100 || input.value < -100;
    }
  }
}

class DutchingOutcomeBox extends React.Component {
  constructor() {
    super();
    this.state = {
      oddsTooltipVisible: false,
      suggestedStakeTooltipVisible: false,
      numberOfRows: 4,
      //outcomes:this.props.notDutchingOutcomes,
      //outcomes: [],
      betSelected: "dutching"
    };
  }

  render() {
    var betSelected = this.state.betSelected;
    return (
      <div className="container-c">
        <div className="table-container">
          <div className="option-table-menu">
            <span onClick={this.props.refresh} className="clear">
              Refresh
            </span>

            <span onClick={this.clearOutcome.bind(this)} className="clear">
              Clear
            </span>
          </div>
          <table className="table">
            <tbody>
              <tr className={"outcome-titles " + betSelected}>
                <th className="outcome-header" id="order">
                  Selection
                </th>
                <th className="outcome-header" id="decimal-odds">
                  Odds
                </th>
                <th className="outcome-header" id="suggested-stake">
                  Suggested Stake
                </th>
              </tr>
              {this.getRows(
                this.props.numberOfBets,
                this.props.suggestedStakes
              )}
            </tbody>
          </table>
          {this.props.errorMessage === true ||
          this.props.errorMessage === false ? null : (
            <div className={this.props.errorColor}>
              <span>{this.props.errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  clearOutcome() {
    var num = 2;
    this.setOutcome(0, false);
    this.props.clearOutcome(num);
  }

  oddsTooltipClicked() {
    this.setState({ oddsTooltipVisible: !this.state.oddsTooltipVisible });
  }

  suggestedStakeTooltipClicked() {
    this.setState({
      suggestedStakeTooltipVisible: !this.state.suggestedStakeTooltipVisible
    });
  }

  getRows(num, suggestedStakes) {
    var rows = [];
    for (let k = 1; k <= num; k++) {
      var odds = "odds" + k,
        suggestedStake = suggestedStakes[k - 1],
        oddOutcomes = this.props.notDutchingOutcomes[k - 1],
        singleOdd = oddOutcomes ? oddOutcomes.odds : null;
      if (singleOdd === "" || singleOdd <= 1) suggestedStake = "";
      rows.push(
        <tr key={k + "ab"}>
          <td key={k + "a"} className="selection-field">
            {k}
          </td>
          <td key={k + "b"} className="selection-field odds">
            {this.getOddsInputFormat(
              odds,
              oddOutcomes,
              this.props.oddsFormat,
              num,
              this.props.betAmount
            )}
          </td>
          <td key={k + "c"} className="selection-field odds">
            <span className="currency">£ </span>
            <input
              type="text"
              value={this.props.ready ? suggestedStake : ""}
              readOnly
              className={this.istheInputClass(suggestedStake)}
            />
          </td>
        </tr>
      );
    }
    return rows;
  }

  istheInputClass(value) {
    var valueExists =
      value == null || value == "" || this.props.ready == false ? "" : "exists";
    return "" + valueExists;
  }

  getOddsInputFormat(odd, outcome, format, num, betAmount) {
    var value = outcome ? outcome.odds : "",
      inputField = "";
    switch (format) {
      case "decimal":
        inputField = (
          <input
            type="number"
            pattern="[0-9\.]*"
            step="any"
            maxLength="6"
            className={this.isTheClass(format, outcome)}
            id={odd}
            value={value}
            onChange={this.setOutcome.bind(this, num, betAmount)}
          />
        );
        return inputField;
        break;
      case "fractional":
        var numeratorId = "numerator-" + odd,
          denominatorId = "denominator-" + odd,
          numerator = "",
          denominator = "";
        if (document.getElementById(numeratorId)) {
          numerator = document.getElementById(numeratorId).value;
          denominator = document.getElementById(denominatorId).value;
        } else if (value > 1) {
          var initialNumerator = (value - 1).toFixed(3),
            factor = 1;
          numerator = initialNumerator;
          denominator = 1;
          while (numerator % 1 && factor < 1000) {
            numerator = initialNumerator * ++factor;
          }
          numerator = Math.round(numerator);
          denominator = factor;
        }
        inputField = [
          <input
            key={"n1"}
            type="number"
            pattern="[0-9]*"
            step="any"
            className={this.isTheClass(format, outcome)}
            maxLength="5"
            id={numeratorId}
            value={numerator}
            onChange={this.setOutcome.bind(this, num, betAmount)}
          />,
          <span className="fractionSep">/</span>,
          <input
            key={"n2"}
            type="number"
            pattern="[0-9]*"
            step="any"
            className={this.isTheClass(format, outcome)}
            maxLength="5"
            id={denominatorId}
            value={denominator}
            onChange={this.setOutcome.bind(this, num, betAmount)}
          />
        ];
        return inputField;
        break;
      case "american":
        var americanValue = value;
        if (outcome && outcome.valid && value >= 2) {
          americanValue = Number((value - 1).toFixed(2) * 100);
        } else if (outcome && outcome.valid && value > 1) {
          americanValue = Number(-100 / (value - 1).toFixed(2));
        }
        inputField = (
          <input
            type="number"
            pattern="[0-9\.]*"
            step="any"
            maxLength="6"
            className={this.isTheClass(format, outcome)}
            value={americanValue}
            id={odd}
            onChange={this.setOutcome.bind(this, num, betAmount)}
          />
        );
        return inputField;
        break;
      default:
        inputField = (
          <input
            type="number"
            pattern="[0-9\.]*"
            step="any"
            maxLength="6"
            className={this.isTheClass(format, outcome)}
            id={odd}
            onChange={this.setOutcome.bind(this, num, betAmount)}
          />
        );
        return inputField;
        break;
    }
  }

  isTheClass(format, outcome) {
    var selectedValid = outcome ? outcome.valid : 1,
      selectedOdd = outcome ? outcome.odds : 1,
      validClass = "";
    if (selectedOdd === "") {
      selectedValid = true;
    }
    if (selectedValid === 1 || selectedValid === true) {
      validClass = "";
    } else if (selectedValid === false || selectedOdd !== "") {
      validClass = "not-valid";
    }
    return "odds-value " + format + " " + validClass;
  }

  setOutcome(num, betAmount, e) {
    var outcomes = [];
    for (let k = 1; k <= num; k++) {
      outcomes.push({
        outcome: "winner",
        odds: this._getOdds(k),
        valid: this._isValid(k),
        stake: +betAmount
      });
    }
    //this.setState({outcomes: outcomes});
    this.props.setOutcome(outcomes);
  }
  _getOdds(k) {
    var input = document.getElementById("odds" + k);
    switch (this.props.oddsFormat) {
      case "decimal":
        if (!input) return "";
        return input && input.value
          ? Math.round(input.value * 10000) / 10000
          : "";
      case "fractional":
        var input1 = document.getElementById("numerator-odds" + k),
          input2 = document.getElementById("denominator-odds" + k),
          fractional = (input1.value * 10000) / input2.value / 10000 + 1,
          fractionalFixed = Math.round(fractional * 1e2) / 1e2;
        if (!input1 || !input2) return "";
        return input2.value && input1.value ? fractionalFixed : "";
      case "american":
        if (!input) return "";
        var positiveVal = Math.abs(input.value);
        if (input.value < 100 && input.value > -100) return input.value;
        return input.value >= 0
          ? (Math.round((input.value * 10000) / 100) / 10000 + 1).toFixed(3)
          : input.value < 0
          ? (Math.round((100 / positiveVal) * 10000) / 10000 + 1).toFixed(3)
          : "";
    }
  }

  _isValid(k) {
    var input = document.getElementById("odds" + k);
    switch (this.props.oddsFormat) {
      case "decimal":
        if (!input) return true;
        return input.value > 1;
      case "fractional":
        var input1 = document.getElementById("numerator-odds" + k);
        var input2 = document.getElementById("denominator-odds" + k);
        if (!input1 || !input2) return true;
        return input1.value > 0 && input2.value > 0;
      case "american":
        if (!input) return true;
        return input.value >= 100 || input.value < -100;
    }
  }
}

class ChooseStakeType extends React.Component {
  constructor() {
    super();
    this.state = {
      tooltipVisible: false
    };
  }

  render() {
    var isItDutchingOrAccumulator = this.props.isItDutchingOrAccumulator;
    return (
      <div className="choose-stake">
        <label className="label-title">
          Stake Type
          <span className="question-mark-img tooltip">
            <span className="tooltiptext">
              You have the option to choose if your stake will be applied each
              line, or for all selections combined.
            </span>
          </span>
        </label>
        <div className="list-and-tooltip">
          <select
            value={this.props.stakeType}
            onChange={this.changeStakeType.bind(this)}
            className="selection-list"
            id="stake-type"
          >
            <option value="combined">Total Combined Stake</option>
            <option value="each" disabled={isItDutchingOrAccumulator}>
              Stake Per Bet
            </option>
          </select>
        </div>
      </div>
    );
  }

  tooltipClicked() {
    this.setState({ tooltipVisible: !this.state.tooltipVisible });
  }

  changeStakeType(e) {
    //this.setState({selected: e.target.value}, this.props.changeStakeType(e.target.value));
    this.props.changeStakeType(e.target.value);
  }
}

class SetStakeAmount extends React.Component {
  constructor() {
    super();
    this.state = {
      //betAmount:this.props.betAmount,
      tooltipVisible: false
    };
  }

  render() {
    var isItDutchingOrAccumulator = this.props.isItDutchingOrAccumulator;
    return (
      <div className="stake-amount">
        <label className="label-title">
          {this.props.isItDutching ? "Total S" : "S"}take
          {this.props.isItDutching ? "d" : null}:
        </label>
        <div className="list-and-tooltip">
          <span>
            <input
              type="number"
              pattern="[0-9\.]*"
              step="any"
              maxLength="9"
              id="stakeTextBox"
              onChange={this.setBetAmount.bind(this)}
              value={this.props.betAmount}
            />
            <img
              src="/wp-content/themes/generic/js/odds-calculator-images/icon-pound.png"
              id="input_sign_pounds"
              alt="pounds sign"
            />
          </span>
        </div>
      </div>
    );
  }

  tooltipClicked() {
    this.setState({ tooltipVisible: !this.state.tooltipVisible });
  }

  setBetAmount(e) {
    //this.setState({betAmount: e.target.value},this.props.setBetAmount.bind(this,e.target.value));
    this.props.setBetAmount(e.target.value);
    //this.props.setBetAmount.bind(this,e.target.value);
    // this.props.betAmount = e.target.value;
  }
}

class Outlay extends React.Component {
  render() {
    var isItDutchingOrAccumulator = this.props.isItDutchingOrAccumulator;
    return (
      <div className="total-box-outlay" id="outlay">
        <span className="total-title-container">
          <span>Total Outlay</span>
        </span>
        <span className="big-number" id="total-outlay">
          £ {this.props.totalOutlay}
        </span>
        <span id="bet-number-info">
          ({this.props.bets} bet{this.props.bets > 1 ? "s" : ""} of £{" "}
          {this.props.eachOutlay})
        </span>
      </div>
    );
  }
}

class Return extends React.Component {
  render() {
    var isItDutchingOrAccumulator = this.props.isItDutchingOrAccumulator;
    var number = parseInt(this.props.value);

    var formatNumber = new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    var totalValue = formatNumber.format(this.props.value);

    return (
      <div className="total-box-return" id="return">
        <div
          className={
            number > 1000000
              ? "total-box-container bg-hide"
              : "total-box-container"
          }
        >
          <span className="total-title-container">
            <span>
              Total Return
              {this.props.isItDutching ? (
                <span> if any selection wins</span>
              ) : null}
            </span>
          </span>
          <span className={this.isTheClass(this.props.updatedClass)}>
            <span className="big-number" id="total-return">
              {isNaN(number) ? "£ ?" : "£ " + totalValue}
            </span>
          </span>
        </div>
      </div>
    );
  }

  isTheClass(updatedClass) {
    var updatedClassNow = updatedClass ? "updated" : "";
    return "number-box " + updatedClassNow;
  }
}

class Profit extends React.Component {
  render() {
    var isItDutchingOrAccumulator = this.props.isItDutchingOrAccumulator;
    var number = parseInt(this.props.value);
    var formatNumber = new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    var totalValue = formatNumber.format(this.props.value);
    return (
      <div className="total-box-profit" id="profit">
        <span className="total-title-container">
          <span>Total Profit</span>
        </span>
        <span className="number-box">
          <div className="big-number" id="total-profit">
            {isNaN(number) ? "£ ?" : "£ " + totalValue}
          </div>
        </span>
      </div>
    );
  }
}

const rootElement = document.getElementById("odds-main");
ReactDOM.render(<Calculator />, rootElement);
