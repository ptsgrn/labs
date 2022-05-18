<script lang="ts">
  import "carbon-components-svelte/css/g10.css";
  import { 
    Header,
    SkipToContent,
    HeaderUtilities,
    HeaderPanelLink,
    HeaderPanelDivider,
    HeaderAction,
    HeaderPanelLinks,
    // SideNav,
    // SideNavItems,
    // SideNavLink,
    // SideNavMenu,
    // SideNavMenuItem,
    Content
  } from 'carbon-components-svelte'
  let isOpen = false
</script>

<Header company="PTSGRN" platformName="Labs">
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderAction bind:isOpen>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
        <HeaderPanelLink href="about">Switcher item 1</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 5</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<Content>
<slot/>
</Content>  