import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-tech-support',
  templateUrl: './tech-support.component.html',
  styleUrls: ['./tech-support.component.css']
})


export class TechSupportComponent implements OnInit {
  tab: string;

  constructor(private sanitizer: DomSanitizer) { }

  link: string = "https://fusion1.GneeAd.com/grafana/d/ov0oEgdik/linux-hosts-metrics-base?orgId=1&refresh=5s&from=1628243876973&to=1628244176973&var-host=192.168.1.150:9100&var-job=revproxy-node-exporter"
  logLink:string ="https://fusion1.GneeAd.com/grafana/d/liz0yRCZz/neuralGnee-integrated-log-search?orgId=1"

  ngOnInit(): void {
    this.tab="System Details"
  }

  tabSelect(tab:string){
    this.tab=tab

    if(tab=="System Details"){
      document.getElementById('custom-tabs-three-home-tab').className='nav-link active'
      document.getElementById('custom-tabs-three-profile-tab').className='nav-link'
    }
    if(tab=="Server Log"){
      document.getElementById('custom-tabs-three-home-tab').className='nav-link'
      document.getElementById('custom-tabs-three-profile-tab').className='nav-link active'
    }

  }


}
