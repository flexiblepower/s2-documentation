---
title: Overview
---
import LinkCard from '@site/src/components/LinkCard';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeJsonIcon from '@iconify-react/mdi/code-json';

# Overview of specifications

## The S2 Standard
The official standard (EN 50491-12-2) that has been approved by European Standardization bodies through CEN/CENELEC. To acquire access to the standard please refer to a national standardization body that is member of CEN/CENELEC or to [ITEH](https://standards.iteh.ai/catalog/standards/clc/6c89cfc7-4f3c-429e-9c75-62307b1572ab/en-50491-12-2-2022).

## S2 JSON
A JSON Schema definition that describes all S2 messages.

<LinkCard
  href="https://github.com/flexiblepower/s2-json"
  title="S2 JSON"
  description="The GitHub project with JSON Schema of the official message definitions"
  icon={<CodeJsonIcon/>}
/>


The data model is also represented on this documentation website, see [Reference](/model-reference).

## S2 Connect
S2 Connect is a protocol specification enabling communication between an Energy Management System (EMS) and an Energy Smart Appliance (ESA) based on the S2 (EN50491‑12‑2) standard. It defines how devices discover, pair, communicate and unpair across local, cloud, and hybrid environments. It allows for a secure and fully interoperable solution between EMS and ESA.

<LinkCard
  href="/s2-connect/1.0.0/discovery-pairing-authentication"
  title="S2 Connect specification"
  description="Read the full specification about interoperable device discovery, secure pairing, and authentication mechanisms"
  icon={<ThemedImage
          alt="My image"
          sources={{
            light: useBaseUrl('/img/Logo-S2-no-text.svg'),
            dark: useBaseUrl('/img/s2-logo-dark.svg'),
          }}
        />}
/>

