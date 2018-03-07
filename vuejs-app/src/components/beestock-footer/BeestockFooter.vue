<template>
  <footer class="beestock-footer footer">
    <div class="footer-container">
      <div class="container">
        <div class="footer-logo">
          <img src="../../assets/images/footer-logo.png" alt="">
        </div>

        <div class="row">
          <div class="col-sm-4 about hidden-xs">
            <h3 class="title">About</h3>
            <h4>BeeStock is a photo community for discovering, sharing and selling inspiring photography powered by creative team worldwide.</h4>
          </div>

          <div class="col-sm-8 col-xs-12" style="padding-right: 0; padding-left: 50px;">
            <div class="row">
              <div class="col-sm-4 col-xs-4">
                <h3 class="title">BeeStock</h3>

                <ul class="list list-unstyled">
                  <li>
                    <a href="">About</a>
                  </li>
                  <li>
                    <a href="">Press</a>
                  </li>
                  <li>
                    <a href="">Support</a>
                  </li>
                  <li><a href="">Terms</a>
                  </li>
                  <li data-reactid="180">
                    <a href="">Privacy</a>
                  </li>
                </ul>
              </div>

              <div class="col-sm-4 col-xs-4">
                <h3 class="title">Community</h3>

                <ul class="list list-unstyled" data-reactid="184">
                  <li>
                    <a href="" data-reactid="186">Apps</a>
                  </li>
                  <li>
                    <a href="" data-reactid="188">ISO Magazine</a>
                  </li>
                  <li>
                    <a href="" data-reactid="190">Upgrade</a>
                  </li>
                  <li>
                    <a href="" data-reactid="192">Developers</a>
                  </li>
                </ul>
              </div>

              <div class="col-sm-4 col-xs-4">
                <h3 class="title">Social</h3>

                <ul class="list list-unstyled" data-reactid="195">
                  <li data-reactid="196">
                    <a href="">Facebook</a>
                  </li>
                  <li data-reactid="198">
                    <a href="">Twitter</a>
                  </li>
                  <li data-reactid="200">
                    <a href="">Google+</a>
                  </li>
                  <li data-reactid="202">
                    <a href="">Pinterest</a>
                  </li>
                  <li data-reactid="204">
                    <a href="">YouTube</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center" data-reactid="206">
        <p data-reactid="207"> Copyrights reserved © BeeStock 2017</p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "beestock-footer"
  }
</script>

<style lang="scss" scoped>
  .footer {
    position: relative;
    bottom: 0;
    width: 100%;

  }
  .footer-container {
    color: black;
    padding-left: 0;
    padding-right: 0;
    max-width: 680px;
    margin: 40px auto 30px;

    * {
      box-sizing: border-box;
    }
  }

  .container {
    max-width: 100%;
  }

  .container .footer-logo {
    margin: 20px auto;
    text-align: center !important;
  }

  .footer-container .about {
    padding-right: 0;
    padding-left: 15px;

    h4 {
      font-size: .75rem;
      line-height: .85rem;
    }
  }

  footer .row {
    margin-left: -25px;
    margin-right: -25px;
  }

  footer .title {
    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  .list-unstyled {
    padding-left: 0;
    list-style: none;
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 12.5px;
  }

  .container li {
    color: #000;
    font-size: .7rem;
    line-height: .95rem;
  }
</style>
