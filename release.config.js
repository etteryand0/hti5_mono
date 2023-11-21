const config = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    ['semantic-release-react-native', {
      skipIos: true,
      androidPath: "apps/mobile/android/app/build.gradle"
    }],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git',
      {
        assets: ['apps/mobile/android/app/build.gradle'],
        message:
          'chore(release); ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'cd apps/mobile/android && ./gradlew assembleRelease --no-daemon',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          'apps/mobile/android/app/build/outputs/apk/release/app-release.apk',
        ],
      },
    ],
  ],
};

module.exports = config;
