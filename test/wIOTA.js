const { expect } = require("chai");

describe("wIOTA basic testing", function () {

    let token;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr4;
    let nativeIotaBase;
    let wIotaBase;

    // This is called before each test to reset the contract
    beforeEach(async function () {
        token = await ethers.getContractFactory("wIOTA");
        mc = await token.deploy();

        nativeIotaBase = ethers.BigNumber.from("1000000000000000000")
        wIotaBase = ethers.BigNumber.from("1000000000000000000")

        signers = await ethers.getSigners();
        [owner, addr1, addr2, addr3, addr4] = signers.slice(0, 5);
        await mc.deployed();
    });

    it("Check if token settings are as expected", async function () {
        expect(await mc.name()).to.equal("wIOTA");
        expect(await mc.symbol()).to.equal("wIOTA");
        expect(await mc.decimals()).to.equal(18);
    });

    it("Sending some tokens to wIOTA", async function () {
        expect(await mc.totalSupply()).to.equal(0);
        expect(await mc.balanceOf(addr1.address)).to.equal(0);
        await addr1.sendTransaction({ to: mc.address, value: nativeIotaBase });
        expect(await mc.totalSupply()).to.equal(wIotaBase);
        expect(await mc.balanceOf(addr1.address)).to.equal(wIotaBase);
    });

    it("Depositing some tokens to wIota using `deposit`", async function () {
        expect(await mc.totalSupply()).to.equal(0);
        expect(await mc.balanceOf(addr1.address)).to.equal(0);
        await mc.connect(addr1).deposit({ value: nativeIotaBase });
        expect(await mc.totalSupply()).to.equal(wIotaBase);
        expect(await mc.balanceOf(addr1.address)).to.equal(wIotaBase);
    });

    it("Withdraw", async function () {
        await expect(mc.connect(addr1).withdraw(wIotaBase)).to.be.revertedWith("Not enough wIOTA to Withdraw");
        await mc.connect(addr1).deposit({ value: nativeIotaBase });
        expect(await mc.totalSupply()).to.equal(wIotaBase);
        expect(await mc.balanceOf(addr1.address)).to.equal(wIotaBase);
        await expect(mc.connect(addr1).withdraw(wIotaBase)).not.to.be.reverted;
        expect(await mc.totalSupply()).to.equal(0);
        expect(await mc.balanceOf(addr1.address)).to.equal(0);
    });

});
