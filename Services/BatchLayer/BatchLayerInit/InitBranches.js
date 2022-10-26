const axios = require("axios").default;
const {uniqueNamesGenerator, adjectives, colors} = require('unique-names-generator');

const customConfig = {
    dictionaries: [adjectives, colors],
    separator: '-',
    length: 2,
};

module.exports = () => {
    const branchesNum = 100;
    let correctBranches = 0;

    const loopbranches = (branches) => {
        return new Promise(async (resolve, reject) => {
            let branchesArray = [];

            for (const branch of branches) {
                if (
                    branch.שם_ישוב.trim() !== "לא רשום" &&
                    correctBranches < branchesNum &&
                    branch.סהכ > 15000
                ) {
                    let citizenData;
                    const names = uniqueNamesGenerator(customConfig); // big-red
                    let branchObject = {
                        id: correctBranches,
                        cityName: branch.שם_ישוב.trim(),
                        cityType: "mixed",
                        ownerName: names,
                        toddlers: branch.גיל_0_6 / branch.סהכ,
                        kids: branch.גיל_6_18 / branch.סהכ,
                        adolescent: branch.גיל_19_45 / branch.סהכ,
                        adults: branch.גיל_46_55 / branch.סהכ,
                        middleAge: branch.גיל_56_64 / branch.סהכ,
                        seniors: branch.גיל_65_פלוס / branch.סהכ,
                    };

                    correctBranches++;

                    let url = `https://boardsgenerator.cbs.gov.il/Handlers/WebParts/YishuvimHandler.ashx?dataMode=Yeshuv&filters=%7B%22Years%22:%222021%22%7D&filtersearch=${encodeURIComponent(
                        branch.שם_ישוב.trim()
                    )}&language=Hebrew&mode=GridData&pageNumber=1&search=&subject=BaseData`;

                    try {
                        citizenData = await axios.get(url);
                    } catch (error) {
                    }

                    citizenData.data.Table?.forEach((tableResult) => {
                        if (tableResult.Name === branch.שם_ישוב.trim()) {
                            const jews =
                                parseInt(tableResult.PepoleNumberJewish.replace(",", "")) || 0;
                            const arabs =
                                parseInt(tableResult.PepoleNumberArab.replace(",", "")) || 0;

                            if (jews === 0) {
                                branchObject.cityType = "arab";
                            } else if (arabs === 0) {
                                branchObject.cityType = "jewish";
                            } else {
                                if (arabs / jews <= 0.05) {
                                    branchObject.cityType = "jewish";
                                } else if (jews / arabs <= 0.05) {
                                    branchObject.cityType = "arab";
                                } else {
                                    branchObject.cityType = "mixed";
                                }
                            }
                        }
                    });
                    branchesArray.push(branchObject);
                }
            }


            // Object.values(branches).forEach(async (branch) => {

            // });
            return resolve(branchesArray);
        });
    };

    return new Promise((resolve, reject) => {
        // Make a request for a user with a given ID
        axios
            .get(
                `https://data.gov.il/api/3/action/datastore_search?resource_id=a5e7080d-3c37-49c2-8cd0-cb2724809216&limit=${
                    branchesNum + 10000
                }`
            )
            .then(async function (branchesResult) {
                // handle success
                const branches = branchesResult.data.result.records;

                let array = await loopbranches(branches);


                if (!array) {
                    return reject("error");
                }
                return resolve(array);
            });
    });
};
