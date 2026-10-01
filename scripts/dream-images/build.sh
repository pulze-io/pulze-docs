#!/usr/bin/env bash
# Renders the Project Dream docs images into images/project-dream/.
# Raw UI shots (shots/, not committed) come from the pulze-dream screenshot harness first:
#   (cd $DREAM_REPO/packages/frontend && node <this dir>/shoot.mjs)
#   (cd $DREAM_REPO/packages/frontend && node harness/shoot-mobile.mjs --only feed,composer --themes dark --out <this dir>/shots/mobile)
set -euo pipefail
cd "$(dirname "$0")"
: "${DREAM_REPO:?set DREAM_REPO to your pulze-dream checkout}"
O=../../images/project-dream
# the composer's Input image block, cut from the 4x composer shot (source px)
node "$DREAM_REPO/.claude/skills/marketing-update/scripts/crop.mjs" shots/composer-connections.dark.png shots/composer-input-crop.png 60 2630 1440 690
f() { node render.mjs frame "shots/$1" "$O/$2.webp" "$3" ${4:-}; }
h() { node render.mjs html "src/$1.html" "$O/pd_$1.webp" "$2"; }

f app-home.dark.png          pd_ui_home               1424x1044
f app-model-picker.dark.png  pd_concepts_model_picker 1424x1044
f composer-input-crop.png    pd_ui_image_input        1424x600 --inset 0.6
h concepts_diagram        1424x700
h concepts_chain          1424x500
h install_apps            1424x1044
h ui_overview             1424x1044
h ui_mobile               1200x900
h quickstart_before_after 1424x700

# ---- the rest of the pages ----
c() { node "$DREAM_REPO/.claude/skills/marketing-update/scripts/crop.mjs" "shots/$1" "shots/$2" $3 $4 $5 $6 >/dev/null; }
c jobcard/improve.dark.png     prompt-review-crop.png 384 38 1792 806
c jobcard/completed.dark.png   jobcard-crop.png       384 38 1792 1152
c composer-instruct-prompt.dark.png prompt-crop.png   0 1760 1568 1030
c composer-i2i.dark.png        i2i-presets-crop.png   0 4050 1568 830
c composer-i2i-mood.dark.png   i2i-mood-crop.png      0 5000 1568 820
c composer-t2i.dark.png        t2i-crop.png           0 0 1568 3113
c composer-upscale-magnific.dark.png upscale-crop.png 0 0 1568 4544
c composer-video-fl.dark.png   video-fl-crop.png      0 1680 1568 1980
c composer-music.dark.png      music-crop.png         0 0 1568 3180
c composer-connections.dark.png grab-chips-crop.png   60 2630 1440 330
c credits/default.dark.png     credits-crop.png       512 371 1536 1058
c settings/desktop.dark.png    settings-crop.png      512 292 1536 1216
c badge-teams.dark.png         teams-crop.png         1640 0 1240 650
c badge-license.dark.png       license-crop.png       1640 0 1240 620
c graph/overview.dark.png      graph-overview-crop.png 688 160 1808 1200
c graph/context-menu.dark.png  graph-menu-crop.png    688 160 1392 1824
c ps-before.png                ps-sel-before.png      232 611 1443 970
c ps-after.png                 ps-sel-after.png       232 611 1443 970
c ps-after.png                 ps-layers.png          2608 1440 592 240

f app-viewer-send.dark.png     pd_quickstart_job_card    1424x1044
f app-grid-filters.dark.png    pd_results_feed           1424x1044
f app-viewer-compare.dark.png  pd_results_viewer_compare 1424x1044
f app-mask.dark.png            pd_edit_mask_editor       1424x1044
f app-segments.dark.png        pd_character_segments     1424x1044
f prompt-review-crop.png       pd_prompts_review         1424x600 --inset 0.8
f i2i-presets-crop.png         pd_i2i_presets            1424x500 --inset 0.5
f i2i-mood-crop.png            pd_i2i_reference_mood     1424x500 --inset 0.5
f t2i-crop.png                 pd_t2i_composer           1424x1044
f upscale-crop.png             pd_upscale_settings       1424x1044
f video-fl-crop.png            pd_video_first_last       1424x900
f music-crop.png               pd_music_composer         1424x1044
f grab-chips-crop.png          pd_plugins_grab_buttons   1424x500 --inset 0.6
f credits-crop.png             pd_credits_buy            1424x900
f settings-crop.png            pd_settings               1424x1044
f teams-crop.png               pd_teams_select           1424x700 --inset 0.6
f license-crop.png             pd_licenses_badge         1424x700 --inset 0.6
f projectlist/team.dark.png    pd_projects_list          1424x1044
f showcase/wide.dark.png       pd_showcase               1424x1044
f canvas/board.dark.png        pd_canvas_overview        1424x1044
f canvas/floater-anchored.dark.png pd_canvas_generate    1424x800
f canvas/peers.dark.png        pd_canvas_collab          1424x800
f graph-overview-crop.png      pd_graph_overview         1424x1044
f graph-menu-crop.png          pd_graph_add_menu         1424x900
f graph/running.dark.png       pd_graph_running          1424x900
f claude-chat.png              pd_claude_chat            1424x1044
f ps-before.png                pd_ps_panel               1424x1044
h edit_examples          1424x500
h edit_draw_annotate     1424x600
h video_edit_restyle     1424x600
h 3d_result              1424x600
h character_before_after 1424x600
h upscale_before_after   1424x600
h ps_selection_result    1424x600
h results_job_card       1424x900
h prompts_block          1424x700
h plugins_grab_flow      1424x800
